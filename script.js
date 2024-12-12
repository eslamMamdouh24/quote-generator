const quoteContainer = document.getElementById("quote-container");
const authorText = document.getElementById("author");
const quoteText = document.getElementById("quote");
const quoteTag = document.getElementById("tag");
const tweetBtn = document.getElementById("tweet-btn");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

const showLoadingSpinner = () => {
  loader.hidden = false;
  quoteContainer.hidden = true;
};

const removeLoadingSpinner = () => {
  quoteContainer.hidden = false;
  loader.hidden = true;
};

// Show new quote
const newQuote = () => {
  if (!apiQuotes?.length) {
    quoteText.textContent = "No quotes available.";
    authorText.textContent = "";
    return;
  }

  showLoadingSpinner();
  // Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes?.length)];
  authorText.textContent = quote?.author || "Unknown";

  // Check the quote length to determine styling
  quote?.text?.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");
  quoteText.textContent = quote?.text;
  quoteTag.textContent = quote?.tag || "Unknown";

  removeLoadingSpinner();
};

// Get quotes from API
const getQuotes = async () => {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch error here
    apiQuotes = localQuotes;
    newQuote();
  }
};

// Tweet quote
const tweetQuote = () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    quoteText?.textContent
  )} - ${encodeURIComponent(
    authorText?.textContent
  )}&hashtags=${encodeURIComponent(quoteTag?.textContent)}`;
  window.open(twitterUrl, "_blank");
};

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
tweetBtn.addEventListener("click", tweetQuote);

// ON load
getQuotes();
