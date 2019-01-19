// this line declares, but does not assign, masterNum, which will be assigned/reassigned whenever makeMaster() is invoked.
var masterNum;
// this line declares, but does not assign, min, which will be assigned/reassigned whenever makeMaster() or boom() are invoked.
var min;
// this line declares, but does not assign, max, which will be assigned/reassigned whenever makeMaster() or boom() are invoked.
var max;
// this line declares and assigns round to begin at 0, for calculation purposes. "Round" displayed on page is always round + 1
var round = 0;
// this line assigns the var low to the field with the css class tag .low on the page
var low = document.querySelector('.low');
// this line assigns the var high to the field with the css class tag .high on the page
var high = document.querySelector('.high');
// this line assigns the var userGuess to the field with the css class tag .guess on the page
var userGuess = document.querySelector('.guess');
// this line assigns the var guessButton to the button with the css class tag .guess-button on the page
var guessButton = document.querySelector('.guess-button');
// this line assignes the var hint to section with the css class tag .clue on the page
var hint = document.querySelector('.clue');
// this line assigns the var lastGuess to the section with the css class tag .last-guess on the page.
var lastGuess = document.querySelector('.last-guess');
// this line assigns the var resetButton to the button with the css class tag .reset-button on the page.
var resetButton = document.querySelector('.reset-button');
// this line assigns the var clearButton to the button with the css class tag .clear-button on the page.
var clearButton = document.querySelector('.clear-button');
// this line assigns the var lastGuessPrompt to the section with the css class tag .last-guess-prompt on the page.
var lastGuessPrompt = document.querySelector('.last-guess-prompt');
// this line assigns the var roundIndicator to the section with the css class tag .current-round on the page.
var roundIndicator = document.querySelector('.current-round');


// this function generates a new random number, within the specified range, by reassigning the min and max vars based on user inputs, if present, and assigns this random number to the var masterNum
function makeMaster() {
  // this line invokes the method checkActive() to check which buttons should be active on the page.
  checkActive();
  // this line assigns the innerHTML of the roundIndicator var to be "Current Round: round+1"
  roundIndicator.innerHTML = `Current Round: ${round + 1}`;
  // this line assigns the min var for the range calculation to be the user specified min or, if not user specified input is present, to be the default of 1 - round * 10
  min = (parseInt(low.value) || 1 - (round * 10));
  // this line assigns the max var for the range calculation to be the user specified max or, if not user specified input is present, to be the default of 100 + round * 10
  max = (parseInt(high.value) || 100 + (round * 10));
  // this line generates a new random number, based on the min and max range values, and assigns that number to the var masterNum
  masterNum = Math.floor(Math.random() * (max - min) + min);
}
// this function takes the input from the guess field and checks that guess against the master number, then provides appropriate feedback based on the guess compared to masterNum
function makeGuess() {
  // this line takes the string input from the guess field's value, makes it into an integer, and assigns it to the block-scoped variable attempt
  let attempt = parseInt(userGuess.value);
  // this line sets the innerHTML for the lastGuessPrompt variable, on the page, to be "Your last guess was"
  lastGuessPrompt.innerHTML = "Your last guess was";
  // this line sets the innerHTML for the lasGuess variable, on the page, to be the value of the last submitted guess
  lastGuess.innerHTML = attempt;
  // this line specifies the code to run if the user's guess is correct
  if(attempt === masterNum) {
    // this line invokes the boom() function
    boom();
  }
  // this line specifies the code to run if the user's guess is within the acceptable range, but lower than masterNum
  else if(attempt < masterNum && attempt > min) {
    // this line invokes the tooLow() function
    tooLow();
  }
  // this line specifies the code to run if the user's guess is within the acceptable range, but higher than masterNum
  else if(attempt > masterNum && attempt < max) {
    // this line invokes the tooHigh() function
    tooHigh();
  }
  // this line specifies the code to run if the user's guess is not valid / not within the acceptable range.
  else {
    // this line invokes the badGuess() function
    badGuess();
  }
  // this line invokes the checkActive() function to see which buttons should be active and activate them, if necessary.
  checkActive();
}

// this function checks which buttons should be active and activates/deactivates them, as necessary
function checkActive() {
  // this line specifies the code to run if the userGuess var value is not empty
  if(userGuess.value !== "") {
    // this line sets the guessButton disabled property to false, if the userGuess value is not empty
    guessButton.disabled = false;
    // this line sets the clearButton disabled property to false, if the userGuess value is not empty
    clearButton.disabled = false;
    // this line adds the css class tag .active to the guessButton var, for styling, if the userGuess value is not empty
    guessButton.classList.add("active");
    // this line adds the css class tag .active to the clearButton var, for styling, if the userGuess value is not empty
    clearButton.classList.add("active");
  }
  // this line specifies the code to run if the userGuess var value is empty
  else {
    // this line sets the guessButton disabled property to true, if the userGuess value is empty
    guessButton.disabled = true;
    // this line sets the clearButton disabled property to true, if the userGuess value is empty
    clearButton.disabled = true;
    // this line removes the css class tag .active from the guessButton var, for styling, if the userGuess value is empty
    guessButton.classList.remove("active");
    // this line removes the css class tag .active from the clearButton var, for styling, if the userGuess value is empty
    clearButton.classList.remove("active");
  }
  // this line invokes the checkActiveReset() function
  checkActiveReset();
}

// this function checks whether or not the reset button should be active, and activates/deactivates it, as necessary.
function checkActiveReset() {
  // this line specifies the code to run if any user input has been entered or the game has progressed beyond its starting state, and is therefore able to be reset
  if(round !== 0 || userGuess.value !== "" || low.value !== "" || high.value !== "" || lastGuessPrompt.innerHTML !== "") {
    // this line sets the disabled property of the resetButton to false, if there is anything that can be reset
    resetButton.disabled = false;
    // this line adds the class tag .active to the resetButton var, for styling, if there is anything that can be reset
    resetButton.classList.add("active");
  }
  // this line specifies the code to run if the game is still in its initial state and there is nothing to reset
  else {
    // this line sets the disabled property of the resetButton to true, if there is nothing to reset
    resetButton.disabled = true;
    // this line removes the class tag .active from the resetButton var, for styling, if there is nothing to reset
    resetButton.classList.remove("active");
  }
}

// this function defines the code to be invoked in the event that a user submits a bad guess (above)
function badGuess() {
  // this line invokes the resetGuess() function
  resetGuess();
  // this line triggers an alert that the user's guess was not valid
  alert("Please guess a NUMBER within the specified RANGE!");
  // this line resets (to blank) the innerHTML of the lastGuess var, on the page
  lastGuess.innerHTML = "";
  // this line sets the innerHTML of the hint var to "not a valid guess", on the page
  hint.innerHTML = "not a valid guess";

}

// this function defines the code to be invoked in the event that a user submits a correct guess
function boom() {
  // this line increments the round var by +1
  round += 1;
  // this line invokes the resetGuess() function
  resetGuess();
  // this line triggers an alert that the user guessed correctly and the game is progressing to the next round
  alert(`BOOM! You guessed correctly! Now advanding to Round ${round + 1}`);
  // this line sets the innerHTML of the hint var to "BOOM!", on the page
  hint.innerHTML = "BOOM!";
  // this line reassigns the value of the low var to be new value of min, which is incremented by -10
  low.value = min -= 10;
  // this line reassigns the value of the high var to be new value of max, which is incremented by +10
  high.value = max += 10;
  // this line invokes the makeMaster() function
  makeMaster();
}

// this function defines the code to be invoked in the event that a user submits a guess that is within the acceptable range, but below the masterNum
function tooLow() {
  // this line invokes the resetGuess() function
  resetGuess();
  // this line sets the innerHTML of the hint var to be "That is too low", on the page
  hint.innerHTML = "That is too low";
}

// this function defines the code to be invoked in the event that a user submits a guess that is within the acceptable range, but is higher than masterNum
function tooHigh() {
  // this line invokes the resetGuess() function
  resetGuess();
  // this line sets the innerHTML of the hint var to be "That is too high", on the page
  hint.innerHTML = "That is too high";
}

// this function defines the code to be run when the userGuess value must be reset
function resetGuess() {
  // this line resets the value of the userGuess var (input field) to be blank
  userGuess.value = "";
  // this line invokes the checkActive() function to check which buttons should be active or disabled
  checkActive();
}

// this function dfines the code that should be run when a user clicks the button to reset the game
function resetGame() {
  // this line resets the round counter to 0
  round = 0;
  // this line resets the innerHTML of the lastGuessPrompt var to be empty/blank, on the page
  lastGuessPrompt.innerHTML = "";
  // this line resets the innerHTML of the hint var to be empty/blank, on the page
  hint.innerHTML = "";
  // this line resets the innerHTML of the lastGuess var to be empty/blank, on the page
  lastGuess.innerHTML = "";
  // this line invokes the resetGuess() function
  resetGuess();
  // this line invokes the resetRange() function
  resetRange();
  // this line invokes the makeMaster() function
  makeMaster();
}

// this function defines the code to run when the range must be reset
function resetRange() {
  // this line resets the value of the low var to be empty/blank, on the page
  low.value = "";
  // this line resets the placeholder of the low var to be the default of 1, on the page
  low.placeholder = "1";
  // this line resets the value of the high var to be empty/blank, on the page
  high.value = "";
  // this line resets the placeholder of the high var to be the default of 100, on the page
  high.placeholder = "100";
}

// this line listens for the event of the page loading and, when that happens, invokes the makeMaster() function
window.addEventListener('load', makeMaster);
// this line listens for the event of the low var input value being changed and, when that happens, invokes the makeMaster() function
low.addEventListener('change', makeMaster);
// this line listens for the event of the high var input value being changed and, when that happens, invokes the makeMaster() function
high.addEventListener('change', makeMaster);
// this line listens for the event of a user entering input in the userGuess field and invokes the checkActive() function, to activate/disable buttons, as appropriate
userGuess.addEventListener('keyup', checkActive)
// this line listens for the event of a user clicking on the guessButton var and, when that happens, invokes the makeGuess() function
guessButton.addEventListener('click', makeGuess);
// this line listens for the event of a user clicking on the resetButton var and, when that happens, invokes the resetGame() function
resetButton.addEventListener('click', resetGame);
// this line listens for the event of a user clicking on the clearButton var and, when that happens, invokes the resetGuess() function
clearButton.addEventListener('click', resetGuess);

