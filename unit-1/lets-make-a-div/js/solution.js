// Declare variables
var deck1 = [];
var deck2 = [];

// Cached element references
var deck1El = document.getElementById('deck1');
var deck2El = document.getElementById('deck2');

// Event Listeners
document.getElementById('btn').addEventListener('click',handleClick)

// Functions
init();

// Initialize deck 1 with array of 52 cards using 
//  provided CSS class names
function init() {
    deck1 = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"]
}

// Function to handle a button click:
function handleClick() {

    if (deck1.length > 0) {  // Used to prevent error on click when no cards are left in deck 1
    let randIdx = Math.floor(Math.random()*deck1.length);   // Randomly selects number from total cards remaining
    cardPicked = deck1.splice(randIdx, 1) // Assigns card with the random index to a variable
    deck2.push(cardPicked);  // Adds card picked to deck 2
    render(cardPicked);  // Passes card picked to render function to display
    }
}

// Function to render new deck state
function render(cardPicked) {
    
    if (deck2.length === 1) {  // Removes outline class when first card is picked
        deck2El.classList.remove("outline");
    }

    if (deck2.length > 1) {  // Removes previous picked card from deck 2 class list
        deck2El.classList.remove(cardToRemove);
    }

    cardToRemove = cardPicked;  // Sets card to be removed on next click
    deck2El.classList.add(cardPicked);  // Adds current card picked to deck 2 array

    if (deck2.length === 26) {  // Adjusts shadow when deck gets above/below halfway full
        deck2El.classList.add("shadow");
        deck1El.classList.remove("shadow");
    }

    if (deck1.length === 0) {  // Removes card back color and adds outline when last card is picked
        deck1El.classList.add("outline");
        deck1El.classList.remove("back-red");
    }
}