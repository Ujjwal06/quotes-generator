const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Loading Spinner Shown
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// Remove Loading Spinner
function complete(){        
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show New Quote
async function getQuotes() {
    loading();
    const proxyUrl = 'https://powerful-bastion-04523.herokuapp.com/'
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
        const response =await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        console.log(data);       
        
        // Check if Author field is blank and replace it with 'Unknown'
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        // Check Quote length to determine styling
        if (data.quoteText.length > 120) {
            quoteText.classList.add("long-quote")
        }else {
            quoteText.classList.remove("long-quote")
        }

        // Set Quote, Hide Loader
        quoteText.innerText = data.quoteText;        
        complete();
    }

    catch (error) {
        console.log('whoops error!' , error)   
        getQuotes(); 
    }
}

//tweet quote
function tweetQuote(){
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.innerText} - ${authorText.innerText}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuotes);
twitterBtn.addEventListener('click', tweetQuote);

//on load
getQuotes();