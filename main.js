// Get all dom element
const providedText = document.querySelector(".text p");
const userText = document.querySelector("#text-area");
const wpmText = document.querySelector("#wpm");
const timer = document.querySelector(".timer");

let millisec = 0;
let sec = 0;
let min = 0;
let interval;

const loadText = () => {
  fetch("https://typingspeedchecker.netlify.app/data.json")
    .then((res) => res.json())
    .then((data) => {
      let quote = data[Math.floor(Math.random() * 15)];
      providedText.textContent = quote.msg;
    })
    .catch((err) => console.error(err));
};

window.addEventListener("DOMContentLoaded", loadText);

// Clock functionality
const runTimer = () => {
  millisec = parseInt(millisec);
  sec = parseInt(sec);
  min = parseInt(min);

  millisec = millisec + 1;

  if (millisec == 100) {
    sec = sec + 1;
    millisec = 0;
  }
  if (sec == 60) {
    min = min + 1;
    sec = 0;
    millisec = 0;
  }

  if (millisec < 10 || millisec == 0) {
    millisec = "0" + millisec;
  }
  if (sec < 10 || sec == 0) {
    sec = "0" + sec;
  }
  if (min < 10 || min == 0) {
    min = "0" + min;
  }

  timer.innerHTML = `${min}:${sec}:${millisec}`;
};

// Start the timer
const start = () => {
  let userTextLength = userText.value.length;
  if (!userTextLength) {
    interval = setInterval(runTimer, 10);
  }
};

// Calculate wpm functionality
const calculateWpm = (str) => {
  const totalTime = (parseInt(min) * 60 + parseInt(sec)) / 60; // in minutes
  str = str.replace(/(^\s*)|(\s*$)/gi, "");
  str = str.replace(/[ ]{2,}/gi, " ");
  str = str.replace(/\n /, "\n");
  const totalWords = str.split(" ").length;
  const wpm = parseInt(totalWords / totalTime);
  wpmText.textContent = wpm;
};

// Match the text with the provided text
const matchText = () => {
  let userTextEntered = userText.value;
  let originatedText = providedText.innerText;
  let originatedTextMatch = originatedText.substring(0, userTextEntered.length);

  if (userTextEntered === originatedText) {
    userText.style.borderColor = "#50e2d6";
    calculateWpm(originatedText);
    clearInterval(interval);
  } else {
    if (userTextEntered === originatedTextMatch) {
      userText.style.borderColor = "#fff";
    } else {
      userText.style.borderColor = "#f30000";
    }
  }
};

// Event listeners
if (
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  )
) {
  userText.addEventListener("keydown", start);
  userText.addEventListener("keyup", matchText);
} else {
  userText.addEventListener("keypress", start);
  userText.addEventListener("keyup", matchText);
}
