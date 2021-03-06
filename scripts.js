var masterNum;
var min;
var max;
var round = 0;
var low = document.querySelector('.low');
var high = document.querySelector('.high');
var userGuess = document.querySelector('.guess');
var guessButton = document.querySelector('.guess-button');
var hint = document.querySelector('.clue');
var lastGuess = document.querySelector('.last-guess');
var resetButton = document.querySelector('.reset-button');
var clearButton = document.querySelector('.clear-button');
var lastGuessPrompt = document.querySelector('.last-guess-prompt');
var roundIndicator = document.querySelector('.current-round');


function makeMaster() {
  checkActive();
  roundIndicator.innerHTML = `Current Round: ${round + 1}`;
  min = (parseInt(low.value) || 1 - (round * 10));
  max = (parseInt(high.value) || 100 + (round * 10));
  masterNum = Math.floor(Math.random() * (max - min) + min);
}

function makeGuess() {
  let attempt = parseInt(userGuess.value);
  lastGuessPrompt.innerHTML = "Your last guess was";
  lastGuess.innerHTML = attempt;
  if(attempt === masterNum) {
    boom();
  }
  else if(attempt < masterNum && attempt > min) {
    tooLow();
  }
  else if(attempt > masterNum && attempt < max) {
    tooHigh();
  }
  else {
    badGuess();
  }
  checkActive();
}

function checkActive() {
  if(userGuess.value !== "") {
    guessButton.disabled = false;
    clearButton.disabled = false;
    guessButton.classList.add("active");
    clearButton.classList.add("active");
  }
  else {
    guessButton.disabled = true;
    clearButton.disabled = true;
    guessButton.classList.remove("active");
    clearButton.classList.remove("active");
  }
  checkActiveReset();
}

function checkActiveReset() {
  if(round !== 0 || userGuess.value !== "" || low.value !== "" || high.value !== "" || lastGuessPrompt.innerHTML !== "") {
    resetButton.disabled = false;
    resetButton.classList.add("active");
  }
  else {
    resetButton.disabled = true;
    resetButton.classList.remove("active");
  }
}

function badGuess() {
  resetGuess();
  alert("Please guess a NUMBER within the specified RANGE!");
  lastGuess.innerHTML = "";
  hint.innerHTML = "not a valid guess";
}

function boom() {
  round += 1;
  resetGuess();
  alert(`BOOM! You guessed correctly! Now advanding to Round ${round + 1}`);
  hint.innerHTML = "BOOM!";
  low.value = min -= 10;
  high.value = max += 10;
  makeMaster();
}

function tooLow() {
  resetGuess();
  hint.innerHTML = "That is too low";
}

function tooHigh() {
  resetGuess();
  hint.innerHTML = "That is too high";
}

function resetGuess() {
  userGuess.value = "";
  checkActive();
}

function resetGame() {
  round = 0;
  lastGuessPrompt.innerHTML = "";
  hint.innerHTML = "";
  lastGuess.innerHTML = "";
  resetGuess();
  resetRange();
  makeMaster();
}

function resetRange() {
  low.value = "";
  low.placeholder = "1";
  high.value = "";
  high.placeholder = "100";
}

window.addEventListener('load', makeMaster);
low.addEventListener('change', makeMaster);
high.addEventListener('change', makeMaster);
userGuess.addEventListener('keyup', checkActive)
guessButton.addEventListener('click', makeGuess);
resetButton.addEventListener('click', resetGame);
clearButton.addEventListener('click', resetGuess);

