let masterNum;
let low = document.querySelector('.low');
let high = document.querySelector('.high');
let userGuess = document.querySelector('.guess');
let guessButton = document.querySelector('.guess-button')
let hint = document.querySelector('.clue')
let lastGuess = document.querySelector('.last-guess')
let resetButton = document.querySelector('.reset-button')
let clearButton = document.querySelector('.clear-button')
let lastGuessPrompt = document.querySelector('.last-guess-prompt')


function makeMaster() {
  let min = parseInt(low.value) || 1 // + rpund * 10
  let max = parseInt(high.value) || 100

  masterNum = Math.floor(Math.random() * (max - min) + min);
  console.log(masterNum, min, max)
}

function makeGuess() {
  let attempt = parseInt(userGuess.value)
  lastGuessPrompt.innerHTML = "Your last guess was"
  lastGuess.innerHTML = attempt
  if(attempt > masterNum) {
    tooHigh()
  }
  else if(attempt < masterNum) {
    tooLow()
  }
  else if(attempt === masterNum) {
    boom()
  }
}

function boom() {
  resetGuess()
  alert("BOOM! You guessed correctly")
  hint.innerHTML = "BOOM!"
  makeMaster()
}

function tooLow() {
  resetGuess()
  hint.innerHTML = "That is too low"
}

function tooHigh() {
  resetGuess()
  hint.innerHTML = "That is too high"
}

function resetGuess() {
  userGuess.value = ""
}

function resetGame() {
  hint.innerHTML = "";
  lastGuess.innerHTML = "";
  userGuess.value = "";
  makeMaster();
}

function clearGuess() {
  userGuess.value = ""
}

window.addEventListener('load', makeMaster);
low.addEventListener('change', makeMaster);
low.addEventListener('keyup', makeMaster);
high.addEventListener('change', makeMaster);
high.addEventListener('keyup', makeMaster);
guessButton.addEventListener('click', makeGuess)
resetButton.addEventListener('click', resetGame)
clearButton.addEventListener('click', clearGuess)

