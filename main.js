// Get all dom element
const providedText = document.querySelector(".text p");
const userText = document.querySelector("#text-area");
const wpmText = document.querySelector("#wpm");
const timer = document.querySelector(".timer");

console.log(providedText);
console.log(userText);
console.log(wpmText);
console.log(timer);

// Clock functionality

// Start the timer
const start = () => {
  let userTextLength = userText.value.length;
  console.log(userTextLength);
};

// Calculate wpm functionality

// Match the text with the provided text
const matchText = () => {
  let userTextEntered = userText.value;
  console.log(userTextEntered);
};

// Event listeners
userText.addEventListener("keypress", start);
userText.addEventListener("keyup", matchText);
