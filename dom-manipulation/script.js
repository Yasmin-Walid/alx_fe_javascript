const quotes = JSON.parse(localStorage.getItem('quotes')) || [
  {
  'text': 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
  'category':'Motivational Quotes'
},
{
  'text': 'Truly great friends are hard to find, difficult to leave, and impossible to forget.',
 'category':'Friendship quotes'
}
];

function showRandomQuote (){

  const randomIndex  = Math.floor(Math.random()*quotes.length);
  const selectedQuote = quotes[randomIndex];

  const elementCreation = document.createElement('p');

  elementCreation.innerHTML = `${selectedQuote.text} - <strong>${selectedQuote.category}</strong>`;

  
  //quote and quote category]
  document.getElementById('quoteDisplay').appendChild(elementCreation);
  
  document.getElementById('showQuoteButton').addEventListener('click', showRandomQuote);

//add the save the Quote Function
};



function createAddQuoteForm (){
  const newQuote = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (!newQuote || !newQuoteCategory) {
    alert('Please enter both a quote and a category.');
    return;
//add the save the Quote Function

  }

const newQuoteObject = {
  'text': newQuote,
  'category': newQuoteCategory
};
  quotes.push(newQuoteObject);

  displayNewQuote(newQuoteObject)
  localStorage.setItem('quotes',JSON.stringify(quotes));


}



function displayNewQuote(quoteObject){
const quoteElement  = document.createElement ('p');
const quoteDisplayDiv = document.getElementById('newQuoteDisplay');

quoteElement.innerText = `${quoteObject.text} - ${quoteObject.category}`;

quoteDisplayDiv.appendChild(quoteElement);
}


function saveQuote (text){
let texts =  JSON.parse(localStorage.getItem('texts')) || [];
texts.push(text);

localStorage.setItem('texts', JSON.stringify(texts))
};


quotes.forEach(quote => displayNewQuote(quote));

