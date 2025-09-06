

const quotes = [
  "Progress, not perfection.",
  "Learning never exhausts the mind.",
  "Knowledge is power.",
  "Stay curious, keep learning!"
];

let quoteIndex = 0;
const quoteElement = document.querySelector(".navbar .quote");

function changeQuote() {
  quoteElement.style.opacity = 0;
  setTimeout(() => {
    quoteElement.textContent = quotes[quoteIndex];
    quoteElement.style.opacity = 1; 
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }, 500);
}


setInterval(changeQuote, 2000);

changeQuote();
