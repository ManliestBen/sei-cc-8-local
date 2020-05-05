# memory-game-plus
# 
## Step 1: Play the game [here](https://www.benmanley.biz/memory-game-plus/) to become familiar with it.  
# 
## Step 2: Write the user stories.  User stories are a great way to define what the application should accomplish.  They also serve as a framework for writing out more thorough pseudocode.
- AAU, I should see a list of difficulty options upon the page loading.
- AAU, I should see a different number of cards on the screen depending on the difficulty selected.
- AAU, I should see a reset button that appears only after selecting a difficulty.
- AAU, I should see messages prompting me to select a difficulty, choose a card, informing that the cards don't match, informing that a match has been found.
- AAU, when I click the first card, it's value should be displayed.
- AAU, when I click the second card, it's value should be displayed, along with a message depending on whether or not the cards match.  If the cards match, they should remain flipped.  If they don't match, they should flip back after a short delay.
- AAU, upon finding all the matches, I should see a congratulatory message with the total number of matches and the time it took to find them all.
- AAU, the game should restart when I push the 'reset' button.
# 
## Step 3: Write out the pseudocode.  Be sure to be as detailed as possible.  The more detailed your pseudocode, the less jumping around you'll have to do when writing the code for the application.
- Define a constant to hold difficulty settings.
- Define variables for the cards in play, the value of the first card drawn, the value of the second card drawn, the index of the first card drawn, the index of the second card drawn, the turn (1 and -1), seconds for a time counter, total time to find all the matches, and a Boolean for determining whether to pause for a delay after clicking the second card. (phew...)
- Define cached element references for a div holding the reset button (to hide it), a div holding the difficulty buttons, the message display element, the play area, and the reset button.
- Define event listeners for the div holding the reset button, the div holding the difficulty buttons, and the play area.  
- Configure the event listeners to rotate between displaying the difficulty buttons and the reset button.
- Write a function to handle setting the difficulty of the game based on the button pressed.  The event handler should pass a number to this function indicating the number of cards to add to the cards in play.
- Using the number of cards passed to the difficulty function, generate a random set of cards to be shuffled.  These cards should then be passed to a shuffle function.
- Write the shuffle function.  It should take in an array of card values, shuffle them, and add each value to an object that also holds an identifier for determining how to display the cards in the render function.  0 will denote a card that is face down, 1 denotes a face up card that is being evaluated as a match, and 2 denotes a card that has been matched and remains face up. The array of cards should be stored in a variable for cards in play, which would look as follows, before and after the shuffle function:
```
['d05', 'hK', 's07', 'cA']   -->    [{0:'d05'}, {0:'hK'}, {0:'s07'}, {0:'cA'}]
```
- Write a render function that displays cards by appending them as children div elements to the play area.  (Hint:  Initializing the play area inner html will remove all cards immediately before a render is called.  This prevents the cards from piling up out of control.)  Stub up conditional statements for rendering cards based on their identifier (0, 1, or 2) in the object.  
- Write the conditional statements for each of the 3 card options.  Add a class name to the div based on the CSS selectors defined in cardstarter.css.  If the card is a 0, it should be face down.  If the card is a 1 or 2, it should be face up, value showing.  Append the divs to the play area.
- Write an initialization function that resets the play area.  Include all necessary variables to reset, including the full deck of cards, which will have been mutated in the previous game.  Call the initialization function at the top of the function section in main.js.
- Call a function in the play area click event listener to handle picking a card.  Be sure to pass the event to the function.
- Define the function to handle picking a card.  Store the index of the card clicked in a variable to access within conditional statements.  Hint:
```js
let cardClickedIdx = Array.from(evt.target.parentNode.children).indexOf(evt.target);
```
- The handle pick function should only be evaluating cards denoted with 0 in their objects (1 and 2 are already face up, and shouldn't need ot be clicked.)  Set up a conditional statement that screens for only 0 values (if 1 or 2, nothing happens).  Within this conditional statement, write two additional conditional statements, one for handling a first card pick and one for a second card pick.  (turn = 1 or -1)  Assign the value and the index of each card to variables for both the first and second cards.  All 4 of these variables should be passed as arguments to a function to compare the cards.
- Write the function to compare cards.  Pass in as arguments the values and indicies of both cards for comparison.  Write conditional statements for handling whether the cards are the same or not.  If they are, change their denotation from a 1 to a 2.  If they don't match, change both to 0.  Display messages in the message cached element informing the user of a match or a miss.
- Add a conditional statement to check whether all of the matches have been found.  Add an incrementor for the match count variable here, and where applicable above for init purposes.  If so, congratulate the winner using the message cached element.
- Write a setInterval function to handle counting the number of seconds since the game started.  Write a clearInterval function to stop the timer before restarting it for a new game.  Put the timer functions in the appropriate locations to get it rolling.
- Add logic to the compare cards function's win condition that evaluates the time elapsed at the moment the matches are complete.  This should then be displayed, along with the count of total matches to the message element.
- Add a setTimeout function to the handle pick function's conditional statement for the second card pick.  Build in a delay to execute before rendering the cards to give the user an opportunity to see the card they picked incorrectly before it disappears.


# 
## Step 4: Take a look at the starter code.  The main.js file contains an array of cards to serve as a full deck to draw from.  The HTML and CSS have been provided and the script tag for the JS is already included in the HTML file.  The basic scaffolding for each section of the application have been defined.  The CDN link for Bootstrap has been included.  
# 
## Step 5: Images/CSS for playing card designs have been included and cardstarter.css has included in the HTML file.  In order to assign a playing card image to an HTML element, all you have to do is add the card name as a class.
## The following code would be used to display a face up card (King of Diamonds) and a face down card with a red back:
```html
<div class="card large dK"></div>
<div class="card large back-red"></div>
```
## Step 6: 
