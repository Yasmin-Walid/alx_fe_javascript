const quotes = JSON.parse(localStorage.getItem('quotes')) || [
  {
    'text': 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
    'category': 'Motivational Quotes'
  },
  {
    'text': 'Truly great friends are hard to find, difficult to leave, and impossible to forget.',
    'category': 'Friendship Quotes'
  }
];

// Step 1: Show a Random Quote
function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[randomIndex];

  const elementCreation = document.createElement('p');
  elementCreation.innerHTML = `${selectedQuote.text} - <strong>${selectedQuote.category}</strong>`;

  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = ''; // Clear previous quote
  quoteDisplay.appendChild(elementCreation);
}

document.getElementById('showQuoteButton').addEventListener('click', showRandomQuote);

// Step 2: Add New Quote
function createAddQuoteForm() {
  const newQuote = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (!newQuote || !newQuoteCategory) {
    alert('Please enter both a quote and a category.');
    return;
  }

  const newQuoteObject = {
    'text': newQuote,
    'category': newQuoteCategory
  };
  
  quotes.push(newQuoteObject);
  localStorage.setItem('quotes', JSON.stringify(quotes));

  displayNewQuote(newQuoteObject);
  populateCategories(); // Update category list if a new category is added

  // Clear input fields
  document.getElementById('newQuoteText').value = '';
  document.getElementById('newQuoteCategory').value = '';
}

function displayNewQuote(quoteObject) {
  const quoteElement = document.createElement('p');
  const quoteDisplayDiv = document.getElementById('newQuoteDisplay');

  quoteElement.innerText = `${quoteObject.text} - ${quoteObject.category}`;
  quoteDisplayDiv.appendChild(quoteElement);
}

document.getElementById('addQuoteButton').addEventListener('click', createAddQuoteForm);

// Step 3: Populate Categories
function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');
  categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset dropdown

  const categories = [...new Set(quotes.map(quote => quote.category))]; // Extract unique categories
  
  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.innerText = category;
    categoryFilter.appendChild(option);
  });
}

// Step 4: Filter Quotes by Category
function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;

  const filteredQuotes = selectedCategory === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.category === selectedCategory);
  
  const quoteDisplayDiv = document.getElementById('newQuoteDisplay');
  quoteDisplayDiv.innerHTML = ''; // Clear existing quotes
  
  filteredQuotes.forEach(quote => displayNewQuote(quote));
  
  // Store the last selected category in localStorage
  localStorage.setItem('selectedCategory', selectedCategory);
}

// Restore the last selected category filter
const savedCategory = localStorage.getItem('selectedCategory');
if (savedCategory) {
  document.getElementById('categoryFilter').value = savedCategory;
  filterQuotes(); // Apply filter on page load
}

// Step 5: Export Quotes to JSON
function exportToJsonFile() {
  const quotesJson = JSON.stringify(quotes, null, 2);
  const blob = new Blob([quotesJson], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  
  URL.revokeObjectURL(url); // Clean up
}

document.getElementById('exportButton').addEventListener('click', exportToJsonFile);

// Step 6: Import Quotes from JSON
function importFromJsonFile(event) {
  const fileReader = new FileReader();
  
  fileReader.onload = function(event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);
      quotes.push(...importedQuotes);
      localStorage.setItem('quotes', JSON.stringify(quotes)); // Save updated quotes to localStorage
      alert('Quotes imported successfully!');
      populateCategories(); // Update categories if necessary
      filterQuotes(); // Re-apply filter after import
    } catch (error) {
      alert('Invalid JSON file!');
    }
  };
  
  fileReader.readAsText(event.target.files[0]);
}

document.getElementById('importFile').addEventListener('change', importFromJsonFile);

// Step 7: Simulate Server Sync
function fetchQuotesFromServer() {
  fetch('https://jsonplaceholder.typicode.com/posts') // Simulate fetching from a server
    .then(response => response.json())
    .then(data => {
      const serverQuotes = data.map(post => ({
        text: post.title,
        category: 'Server Quotes'
      }));

      // Sync server quotes with local storage
      quotes.push(...serverQuotes);
      localStorage.setItem('quotes', JSON.stringify(quotes));
      alert('Quotes synced from server.');
      populateCategories(); // Update categories
      filterQuotes(); // Re-apply filter after sync
    })
    .catch(error => console.error('Error fetching data:', error));
}

document.getElementById('syncButton').addEventListener('click', fetchQuotesFromServer);

// Step 8: Initial Setup
populateCategories(); // Initial population of categories
filterQuotes(); // Display all quotes on page load
