# Number Guessing Game
## JavaScript/HTML/CSS
# 
## A deployed version of the final game can be found [here](https://www.benmanley.biz/guessing-game/).
# 
## User Stories:
- As a user(AAU), I should be able to guess a number within a given range.
- AAU, I should see a message if my guess is outside the indicated range.
- AAU, I should see a message indicating if my guess is higher or lower than the secret number.
- AAU, I should see a list of my previous guesses, showing them in different colors based on whether they are over or under the secret number.
- AAU, I should see a message congratulating me if I guess the secret number.
- AAU, I should see a message telling me how many tries it took me to guess the secret number.
- AAU, I should be able to click a 'Reset' button to reset the game.
## Step 1:  Create a directory to hold the files:
```
mkdir browser-guessing-game
```
# 
## Step 2:  Create the files and directories for the game (Note the creation of multiple files/directories by just putting a space between them instead of repeating the mkdir/touch commands):
```
mkdir js css
touch index.html js/main.js css/style.css
```
# 
## Step 3:  Add boilerplate including a script tag for the JavaScript/CSS files to index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessing Game</title>
    <link rel="stylesheet" href="css/style.css">
    <script defer src="js/main.js"></script>
</head>
<body>
    
</body>
</html>
```
# 
## Step 4: Add section headings using commented out lines to organize the sections in main.js:
```js
/*------Constants------*/

/*------Variables------*/

/*------Cached Element References------*/

/*------Event Listeners------*/

/*------Functions------*/
```

# 
## Step 5: Write pseudo-code for the game based on the user stories:
- Create an HTML element for the game's title.
- Create an HTML element to handle displaying messages to the user.
- Create an input field for the user to enter a number.
- Create an HTML element to handle displaying a list of previous guesses.
- Create 'Guess' and 'Reset' buttons.
- Define variables for secret number, guess list, current guess, if there is a winner (boolean).
- Define cached element reference for the game message and previous guesses HTML elements, and both buttons.
- Write an initialization function that resets the game's status and picks a winning number.  Call the initialization function before any other functions.
- Write an event listener for the 'Reset' button to run the initialization function and reset the game.
- Add an event listener for the 'Submit' button that calls a function to check the current guess.  Pass the current value of the input element into the function for comparison.  This function should compare the guess to the secret number.  Stub up conditional statements to handle what happens when the number is higher, lower, or equal to the secret number.
- Fill in each of the conditional statements for the checkGuess function.  Flip the isWinner variable to true if there's a correct guess to prevent additional clicks.  Add a line to clear out the guess input value as well as error handling for inputting a number out of range.  Push the guess into the previous guesses array.  Call a function to render all guesses.
- Write a render function to display the list of previous guesses on the page.  Append an element to the cached guesses element, also adding a class name indicating whether it is higher or lower than the secret number.
# 
## Step 6: Create an HTML element for the game's title in index.html:
```html
<body>
    <h1>Number Guessing Game</h1>
</body>
```
# 
## Step 7: Add some simple CSS in style.css to center everything on the page:
```css
body {
    text-align: center;
    margin-top: 50px;
}
```
# 
## Step 8: Create an element in index.html to handle displaying messages to the user.  Be sure to give it an id of "message":
```html
<h3 id="message">Please enter a guess between 1 and 100!</h3>
```
# 
## Step 9: Create an input field for the user to enter a guess, along with a button to handle submitting the guess.  Give both elements appropriate id values.  Add placeholder text to the input field to pretty it up.  Be sure to enclose both the <input> and the <button> in a <div> so that they are displayed on the same line:
```html
<div>
    <input id="guessInput" type="text" placeholder="Enter guess here...">
    <button id="guessButton">Guess</button>
</div>
```
# 
## Step 10: Create an HTML element to handle displaying a list of previous guesses.  Be sure to give the element an id.  Put an element inside to show where guesses will be displayed:
```html
<div id="prevGuesses"></div>
```
# 
## Step 11: Add CSS to handle formatting the previous guesses list:
```css
#prevGuesses {
    margin-top: 30px;
    font-size: 20px;
}

.guess {
    margin-top: 10px;
    font-size: 20px;
}
```
# 
## Step 12: Add a button for the user to reset the game.  Be sure to give the button an id:
```html
<button id="resetButton">Reset</button>
```
# 
## Step 13: Add a little CSS for the button:
```css
#resetButton {
    margin-top: 20px;
}
```
# 
## Step 14: In main.js, define variables for the secret number, guess list, current guess, and a boolean for whether there is a winner:
```js
/*------Variables------*/
let secretNum, guessList, isWinner;
```
# 
## Step 15: Define cached element reference for the game message and previous guesses HTML elements, the guess input field, and both buttons: 
```js
/*------Cached Element References------*/
const messageEl = document.getElementById('message');
const guessesEl = document.getElementById('prevGuesses');
const guessBtn = document.getElementById('guessButton');
const resetBtn = document.getElementById('resetButton');
const guessInput = document.getElementById('guessInput');
```
# 
## Step 16: Write an initialization function that resets the game's status and picks a winning number.  Call the initialization function before any other functions:
```js
/*------Functions------*/

init();

function init() {
    guessesEl.innerText = '';
    messageEl.innerText = 'Please enter a number between 1 and 100'
    guessInput.value = '';
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*100) + 1;
}
```
# 
## Step 17: Write an event listener for the 'Reset' button to run the initialization function and reset the game:
```js
/*------Event Listeners------*/

resetBtn.addEventListener('click', function() {
    init();
});
```
# 
# ----------- Code Checkpoint -----------
## Listed below are the contents of index.html, main.js, and style.css.  Use these as references if you're encountering any errors.
# index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessing Game</title>
    <link rel="stylesheet" href="css/style.css">
    <script defer src="js/main.js"></script>
</head>
<body>
    <h1>Number Guessing Game</h1>
    <h3 id="message">Please enter a guess between 1 and 100!</h3>
    <div>
        <input id="guessInput" type="text" placeholder="Enter guess here...">
        <button id="guessButton">Guess</button>
    </div>
    <div id="prevGuesses"></div>
    <button id="resetButton">Reset</button>
</body>
</html>
```
# main.js:
```js
/*------Constants------*/

/*------Variables------*/
let secretNum, guessList, isWinner;

/*------Cached Element References------*/
const messageEl = document.getElementById('message');
const guessesEl = document.getElementById('prevGuesses');
const guessBtn = document.getElementById('guessButton');
const resetBtn = document.getElementById('resetButton');
const guessInput = document.getElementById('guessInput');

/*------Event Listeners------*/

resetBtn.addEventListener('click', function() {
    init();
});

/*------Functions------*/

init();

function init() {
    guessesEl.innerText = '';
    messageEl.innerText = 'Please enter a number between 1 and 100'
    guessInput.value = '';
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*100) + 1;
}
```
# style.css:
```css
body {
    text-align: center;
    margin-top: 50px;
}

#prevGuesses {
    margin-top: 30px;
    font-size: 20px;
}

.guess {
    margin-top: 10px;
    font-size: 20px;
}

#resetButton {
    margin-top: 20px;
}
```
# ----------- End Of Code Checkpoint -----------

## Step 18: Add an event listener for the 'Submit' button that calls a function to check the current guess.  Check for a winner to disallow clicks once the game has been won.  Pass the current value of the input element into the function for comparison.  Use parseInt on the value to turn it from a string into a number.  Define this function below the initialization function.  This function should compare the guess to the secret number.  Stub up conditional statements to handle what happens when the number is higher, lower, or equal to the secret number:
```js
/*------Event Listeners------*/

guessBtn.addEventListener('click', function() {
    if (guessList.length === 0) {
        guessesEl.innerText = 'Previous Guesses:'
    }
    if (isWinner === false) {
        checkGuess(parseInt(guessInput.value));
    }
})
```
```js
// Below the initialization function:

function checkGuess (guess) {
    if (guess === secretNum) {
        // Win scenario
    } else if (guess <= secretNum) {
        // Guess too low
    } else {
        // Guess too high
    }
}
```
## Step 19: Fill in each of the conditional statements for the checkGuess function.  Each condition should display a different message using the cached message element.  Flip the isWinner variable to true if there's a correct guess to prevent additional clicks.  Add a line to clear out the guess input value as well as error handling for inputting a number out of range.  Push the guess into the previous guesses array.  Add a class name to the message element to change it's color based on the guess.  (Don't forget to add a line in the initialization function to change the class name back!)  Call a function to render all guesses (which will be defined in the next step):
```js
function init() {
    // Add this line of code:
    messageEl.className = '';
    guessesEl.innerText = '';
    messageEl.innerText = 'Please enter a number between 1 and 100'
    guessInput.value = '';
    guessList = [];
    .
    .
    .
```
```js
function checkGuess (guess) {
    guessInput.value = '';
    if (guess < 1 || guess > 100) {
        messageEl.innerText = 'Whoops!  Please try a number between 1 and 100.';
    } else if (guess === secretNum) {
        messageEl.className = 'winner';
        isWinner = true;
        if (guessList.length === 0) {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`
        } else {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses!`
        }
    } else if (guess <= secretNum) {
        messageEl.className = 'low';
        messageEl.innerText = `${guess} is too low, please try again!`
        guessList.push(guess);
    } else {
        messageEl.className = 'high';
        messageEl.innerText = `${guess} is too high, please try again!`
        guessList.push(guess);
    }
    render(guess);
}
```
# 
## Step 20: Add CSS styling for each guess condition:
```css
.high {
    color: red;
}

.low {
    color: blue;
}

.winner {
    color: green;
}
```
# 
## Step 21: Write a render function to display the list of previous guesses on the page.  Append an element to the cached guesses element, also adding a class name indicating whether it is higher or lower than the secret number.  (Add the render function in the initialization function to refresh changes being made to the DOM on a reset!):
```js
function init() {
    messageEl.className = '';
    guessesEl.innerText = '';
    messageEl.innerText = 'Please enter a number between 1 and 100'
    guessInput.value = '';
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*5) + 1;
    // Add this line
    render();
}
```
```js
function render(guess) {
    if (guess > secretNum) {
        var div = document.createElement("div");
        div.innerText = guess;
        div.className = 'high';
        guessesEl.appendChild(div);
    } else if (guess < secretNum) {
        var div = document.createElement("div");
        div.innerText = guess;
        div.className = 'low';
        guessesEl.appendChild(div);
    }
}
```
# 
# ----------- Code Checkpoint -----------
## Listed below are the contents of index.html, main.js, and style.css.  Use these as references if you're encountering any errors.
# index.html:
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Guessing Game</title>
    <link rel="stylesheet" href="css/style.css">
    <script defer src="js/main.js"></script>
</head>
<body>
    <h1>Number Guessing Game</h1>
    <h3 id="message">Please enter a guess between 1 and 100!</h3>
    <div>
        <input id="guessInput" type="text" placeholder="Enter guess here...">
        <button id="guessButton">Guess</button>
    </div>
    <div id="prevGuesses"></div>
    <button id="resetButton">Reset</button>
</body>
</html>
```
# style.css:
```css

body {
    text-align: center;
    margin-top: 50px;
}

#prevGuesses {
    margin-top: 30px;
    font-size: 20px;
}

.guess {
    margin-top: 10px;
    font-size: 20px;
}

#resetButton {
    margin-top: 20px;
}

.high {
    color: red;
}

.low {
    color: blue;
}

.winner {
    color: green;
}
```
# main.js:
```js
/*------Constants------*/

/*------Variables------*/
let secretNum, currentGuess, guessList, isWinner;

/*------Cached Element References------*/
const messageEl = document.getElementById('message');
const guessesEl = document.getElementById('prevGuesses');
const guessBtn = document.getElementById('guessButton');
const resetBtn = document.getElementById('resetButton');
const guessInput = document.getElementById('guessInput');

/*------Event Listeners------*/

resetBtn.addEventListener('click', function() {
    init();
});

guessBtn.addEventListener('click', function() {
    if (guessList.length === 0) {
        guessesEl.innerText = 'Previous Guesses:'
    }
    if (isWinner === false) {
        checkGuess(parseInt(guessInput.value));
    }
})

/*------Functions------*/

init();

function init() {
    messageEl.className = '';
    guessInput.value = '';
    guessesEl.innerText = '';
    messageEl.innerText = 'Please enter a number between 1 and 100'
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*100) + 1;
    render();
}

function checkGuess (guess) {
    guessInput.value = '';
    if (guess < 1 || guess > 100) {
        messageEl.innerText = 'Whoops!  Please try a number between 1 and 100.';
    } else if (guess === secretNum) {
        messageEl.className = 'winner';
        isWinner = true;
        if (guessList.length === 0) {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`
        } else {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses!`
        }
    } else if (guess <= secretNum) {
        messageEl.className = 'low';
        messageEl.innerText = `${guess} is too low, please try again!`
        guessList.push(guess);
    } else {
        messageEl.className = 'high';
        messageEl.innerText = `${guess} is too high, please try again!`
        guessList.push(guess);
    }
    render(guess);
}

function render(guess) {
    if (guess > secretNum) {
        var div = document.createElement("div");
        div.id = 'guess';
        div.innerText = guess;
        div.className = 'high';
        guessesEl.appendChild(div);
    } else if (guess < secretNum) {
        var div = document.createElement("div");
        div.id = 'guess';
        div.innerText = guess;
        div.className = 'low';
        guessesEl.appendChild(div);
    }
}


```
# ----------- End Of Code Checkpoint -----------
# 
# BONUS MATERIAL:
## The following section contains some fun additions to make this game a little less boring.  I've picked a few examples of easy to use JavaScript/CSS libraries that spice things up a bit.  
# 
# Adding Confetti on a win:
## Who doesn't love confetti?  The simple answer is nobody.  If you want a quick way to add confetti streamers to an application, check out [confetti.js](https://github.com/mathusummut/confetti.js).
## By simply adding the CDN link in a script tag in the head of the index.html file, you'll have access to all sorts of functions that control confetti in your app.
```js
<script src="https://cdn.jsdelivr.net/gh/mathusummut/confetti.js/confetti.min.js"></script>
```
## After adding the CDN link, simply add one of the functions to the win logic and you'll be celebrating in no time:
```js
function checkGuess (guess) {
    guessInput.value = '';
    if (guess < 1 || guess > 100) {
        messageEl.innerText = 'Whoops!  Please try a number between 1 and 100.';
    } else if (guess === secretNum) {
        messageEl.className = 'winner';
        isWinner = true;
        // Adding this single line of code will cause confetti to fall for 1.5 seconds on a correct guess!
        confetti.start(1500);
        if (guessList.length === 0) {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`
        } else {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses!`
        }
        .
        .
        .
```
# Spice up your buttons with Bootstrap:
## Let's face it, normal buttons are boring.  A quick way to add some style to your buttons is by using the [Bootstrap library](https://getbootstrap.com/).
## Grab the CDN from the documentation and add it to the head of index.html.  It comes with default options for many html elements, so you will notice a few changes to the game after adding the link.  (Make sure you add it ABOVE the style.css link or else it will screw with all that hard work we did earlier to get things centered!):
```html
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
```
## Take a look at the [documentation for buttons](https://getbootstrap.com/docs/4.4/components/buttons/).  All that's needed to style a button is adding a couple of class names!  Let's update the button elements in the index.html:  
```html
<button id="guessButton" class="btn btn-primary">Guess</button>
.
.
.
<button id="resetButton" class="btn btn-danger">Reset</button>
```
## Everybody loves colored buttons!  (Especially when they're KU colors.  🏀💓💙💛 ROCK CHALK JAYHAWK!!!! 💛💙💓🏀)
# 
# Animating HTML elements:
## One of the simplest was to add nifty animations to an application is by using the [animate.css](https://daneden.github.io/animate.css/) library.
## Grab the CDN from the documentation and put it in the head of the index.html file:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css">
```
## After adding the CDN, the [documentation](https://github.com/daneden/animate.css#animations) mentions that to give an element an animated effect, add 'animated' and whatever the animation name is you're after to the element.  Let's make our title wobble if the game is won:
```js
function init() {
    // Reset the title class name when resetting game
    titleEl.className = '';
    messageEl.className = '';
    guessInput.value = '';
    guessesEl.innerText = '';
    messageEl.innerText = 'Please enter a number between 1 and 100'
    guessList = [];
    isWinner = false;
    secretNum = Math.floor(Math.random()*5) + 1;
    render();
    console.log(secretNum);
}
```
```js
function checkGuess (guess) {
    guessInput.value = '';
    if (guess < 1 || guess > 100) {
        messageEl.innerText = 'Whoops!  Please try a number between 1 and 100.';
    } else if (guess === secretNum) {
        // Add this line
        titleEl.className = 'animated bounce'
        messageEl.className = 'winner';
        isWinner = true;
        confetti.start(1500);
        if (guessList.length === 0) {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`
        } else {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses!`
        }
```
# Adding sound effects:
## Let's add a sweet kazoo sound effect to go with the awesome confetti.  You'll notice that there's a directory named 'audio' with a file 'kazoo.wav' within it.  Declare a variable in the constants section of main.js:
```js
/*------Constants------*/
const kazoo = new Audio('audio/kazoo.wav');
```
# Using setTimeout, add a 1 second delay to the sound effect and include it in the code where the winner is being declared.  Easy peasy, you've got yourself some sweet kazoo action!:
```js
function checkGuess (guess) {
    guessInput.value = '';
    if (guess < 1 || guess > 100) {
        messageEl.innerText = 'Whoops!  Please try a number between 1 and 100.';
    } else if (guess === secretNum) {
        titleEl.className = 'animated bounce'
        messageEl.className = 'winner';
        isWinner = true;
        confetti.start(1500);
        // Add this line of code:
        setTimeout(function(){kazoo.play();},1000);
        if (guessList.length === 0) {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guess!`
        } else {
            messageEl.innerText = `Congratulations!  You found the number in ${guessList.length +1} guesses!`
        }
```