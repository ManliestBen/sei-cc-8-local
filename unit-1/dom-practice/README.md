# dom-practice
# 
# These exercises are designed to help you practice using JavaScript to manipulate HTML elements.  Minimal CSS will be used. 
## Please follow each step in order, as steps may require working code from previous steps to function properly.
# 
## Check out the application [here](http://benmanley.biz/dom-playground/).
# 
## Step 1 (trivial):  Create an index.html file.  Create js and css directories.  Within the js directory, create main.js.  Within the css directory, create style.css.
# 
## Step 2 (trivial):  Set up index.html with boilerplate HTML.  Add a script tag for the JavaScript file and a link to the CSS file.  Change the default title to "DOM Practice."
# 
## Step 3 (trivial):  Write the HTML for the following:
## - h1 element with an id of 'message' that contains the text 'I'm a message!'
## - input element with an id of 'inputMessage' with a placeholder 'Please enter message...'
## - button with an id of 'messageButton' that contains the text 'Message Button'
# 
## Step 4 (easy):  Write CSS using a grid display to center all elements on the page, and all the text within each element.  Adjust the width of all buttons to 100px and make sure they remain centered on the page.  Change the background color to cornflower blue.  (Everybody loves cornflower blue.)
# 
## Step 5 (easy):  Store each of the 3 HTML elements from step 3 using cached element references.
# 
## Step 6 (easy):  Write an event listener that listens for a click on the message button and changes the text content of the message element to whatever is currently entered in the input field.
# 
## Step 7 (easy):  Write the HTML for an h2 tag that contains the text 'Change the background!'  Also, add HTML for 5 buttons wrapped in a single div element with the id 'buttonRow'.  Each of them should have a class of 'backgroundButton.'  Each of them should have an id of 'button1, button2, etc...'  The button text should contain the numbers 1 - 5.
# 
## Step 8 (easy):  Write the CSS to adjust the width of the newly added buttons to 50px.  Adjust the colors of each button as follows:
## - Button 1:  crimson
## - Button 2:  orangered
## - Button 3:  #ffff00
## - Button 4:  lime
## - Button 5:  rgb(72, 72, 199)
# 
## Step 9 (medium):  Define an object called colorLookup that has key-value pairs that match the button numbers and colors.  Add a single cached element reference using querySelectorAll for all of the color buttons.  
# 
## Step 10 (medium):  Write a single event listener that handles a click on all the color buttons that changes the background color of the body to the color of the button, using the newly defined object.  
# 
## Step 11 (medium):  Add a single button below the color buttons that resets the background color to cornflowerblue.  Write the HTML for the button, the cached element reference, and the event handler.
# 
## Step 12 (medium):  Add a div element with an id of 'displayButtons' that contains two buttons.  The first button should contain the text 'Show Colors' and an id of 'showColors,' the second should contain 'Hide Colors' and an id of 'hideColors.'  Write CSS to add top and bottom margins of 10px to all buttons so they're not all up in each other's business.  Add cached element references for the div and each button.
# 
## Step 13 (medium):  Add a cached element reference for the div containing the color buttons.  Add an event listener to that div.  Set up a conditional statement that uses a ternary expression to hide the div containing the color buttons when the hide button is clicked and show them when the show button is clicked.
# 
## Step 14 (medium):  Write and invoke an initialization function that hides the 'Show Colors' button when the pages initially loads.  Add functionality to the ternary statement to handle hiding one of the two buttons based on whether or not the colors are showing.  (If the colors are showing, the show button should be hidden and vice versa.)
# 
## Step 15 (medium): Add a div with an id of 'tacoCatButtons' that contains 3 button elements, each with a class of 'taco-cat-btn' and id's of 'tacoButton,' 'catButton,' and 'tacoCatButton.'  They also have text content of 'Taco,' 'Cat,' and 'TacoCat' respectively.  Write CSS to adjust the font size for the buttons to 20px.  Write cached element references for each of them.  Add an event listener to the div that handles a click and passes the inner text of the button to a function named appendTacoCat as all lower-case letters.
# 
## Step 16 (medium):  Write the function for appendTacoCat.  The function should accept a string and use that to reference one of 3 URLs stored in a lookup object.  Define the object as follows:
## Step 17 (medium):  Add a section HTML element with an id of 'tacoCatZone' and add it as a cached element reference.  Write CSS to display all elements within this element as a grid, 5 elements wide, repeating.  Using the string passed to the function, append an img element with a fixed width of 100px to the tacoCatZone section every time one of the buttons is pressed, being sure to append the correct image based on the button click.  Add a line in the init function to reset the inner html of the tacoCatZone to an empty string, then add the init function to the reset button event handler.
# 
## Step 18 (easy):  Add an input element with a type of 'number' and an id of 'mathResult.' Change the font size to 45px, the width to 250px, and center the text within it.  Beneath the input, add a div element with an id of 'mathInputs' containing two additional input elements within.  This div should contain the text '?.'  Give the inputs each a type of 'number,' a value of 0, a class of 'math-input' and id's of 'mathInput1' and 'mathInput2.'  Write CSS to adjust the font size of these input fields to 35px, their width to 100px, and center the text within them.  Adjust font size within the div to 35px and add top and bottom margins of 10px.
# 
## Step 19 (easy):  Add a div with an id of 'operators' that contains 4 more buttons.  Each button should have a class of 'operator' and their id's should be 'plus,' 'minus,' 'times,' and 'divided.'  Put the mathematical operators as text within each button.  Write the CSS to adjust the width of the buttons to 40px and the font size to 25px.  Add cached element references for the math result field, both inputs, for each button, and for the div that contains them.
# 
## Step 20 (hard):  Write a single event listener to handle a click on any of the buttons.  Write an object named mathOps that has key-value pairs using the mathematical operators as strings (keys) and a function corresponding to their action that accepts the two input values as numbers (values).  The value of the math result field should be changed to match whatever the result is returned from passing the 3 values (operator, value 1, and value 2) to the object for evaluation.  Oh, and use arrow functions!  (This would be a GREAT job interview question!!!)
# 
## Step 21a (ludicrous):  Add two buttons with id's of 'raveOn' and 'raveOff,' with text contents of 'Rave Mode On' and 'Rave Mode Off' respectively.  Add cached element references for each button, along with one that selects ALL elements on the page.  Declare a variable named raveInterval.  Write a click handler for each of the buttons that flips between one or the other being displayed.  Add a statement to the init function to initialize the 'off' button as hidden.  In the click handler for 'on,' write a function that handles setting an interval for a function called rave, using raveInterval and a 100ms interval (be sure to include a clearInterval function check in here to prevent multiple instances).  In the click handler for 'off,' write a function that clears the interval for the raveInterval and refreshes the entire page.
# 
## Step 21b (ludicrous):  Write the function called rave that uses the cached element reference for ALL the elements on the page to cycle through each element and change the color and background color to a random rgb value. 
# 
## Step 22a (ludicrous):  Add a button alongside the color buttons with an id of 'button6' and inner text of '6.'  Add a cached element reference for the button.  In the lookup object, call a function for the value of the key '6' to invoke a function named colorCycle.
## Step 22b (ludicrous):  Write a setInterval function to handle changing the background color of button 6 by iterating through all available values of r, g, and b with a 5ms timing.  Declare variables r, g, and b, and colorInterval.  Initialize r = 255, b = 0, g = 0.   
# 
## Step 22c (ludicrous):  Write a function called rainbowFade that does the same thing as the rainbowButton function, but changing the background of the body instead of the button.  Remove it from the setInterval so that it doesn't automatically run.  Define the function colorCycle that was invoked in step 22a.  This function should check for colorInterval in a clearInterval conditional and then use it to setInterval on rainbowFade at 5ms.  Add conditional statements to the colorButtons event listener to handle a button press of 6, so that the text changes to 'STOP,' and the function inside the lookup object is invoked.  Don't forget to add conditionals to flip the button back from 'STOP' to '6,' and clearInterval on the colorInterval when it is pressed.  


