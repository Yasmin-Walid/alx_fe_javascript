const quotes = [
  {
  'quote': 'The greatest glory in living lies not in never falling, but in rising every time we fall.',
  'quoteCategory':'Motivational Quotes'
},
{
  'quote': 'Truly great friends are hard to find, difficult to leave, and impossible to forget.',
 'quoteCategory':'Friendship quotes'
}
];

function showRandomQuote (){

  const randomIndex  = Math.floor(Math.random()*quotes.length);
  const selectedQuote = quotes[randomIndex];

  const elementCreation = document.createElement('p');

  elementCreation.innerText = `${selectedQuote.quote} - ${selectedQuote.quoteCategory}`;

  //quote and quote category]
  document.getElementById('quoteDisplay').appendChild(elementCreation);

};



function addQuote (){
  const newQuote = document.getElementById('newQuoteText').value;
  const newQuoteCategory = document.getElementById('newQuoteCategory').value;

  if (!newQuote || !newQuoteCategory) {
    alert('Please enter both a quote and a category.');
    return;
  }

const newQuoteObject = {
  'quote': newQuote,
  'quoteCategory': newQuoteCategory
};
  quotes.push(newQuoteObject);
  displayNewQuote(newQuoteObject)
}



function displayNewQuote(quoteObject){
const quoteElement  = document.createElement ('p');
const quoteDisplayDiv = document.getElementById('newQuoteDisplay');

quoteElement.innerText = `${quoteObject.quote} - ${quoteObject.quoteCategory}`;

quoteDisplayDiv.appendChild(quoteElement);
}


quotes.forEach(quote => displayNewQuote(quote));