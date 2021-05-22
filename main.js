// Get all dom element
const providedText = document.querySelector(".text p").innerText;
const userText = document.querySelector("#text-area");
const wpmText = document.querySelector("#wpm");
const timer = document.querySelector(".timer");

let millisec = 0;
let sec = 0;
let min = 0;
let interval;

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
  const totalTime = (min * 60 + sec) / 60;
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
  let originTextMatch = providedText.substring(0, userTextEntered.length);

  if (userTextEntered === providedText) {
    userText.style.borderColor = "#50e2d6";
    calculateWpm(providedText);
    clearInterval(interval);
  } else {
    if (userTextEntered === originTextMatch) {
      userText.style.borderColor = "#fff";
    } else {
      userText.style.borderColor = "#f30000";
    }
  }
};

// Event listeners
userText.addEventListener("keydown", start);
userText.addEventListener("keyup", matchText);
