/*------Constants------*/

const difficulty = {
    "Easy": 5,
    "Medium": 10,
    "Hard": 15
}

/*------Variables------*/

let winTime, seconds, matchCount, card1Val, card1Idx, card2Val, card2Idx, waitingForTimeout;
let cardsInPlay = [];
let turn = 1;
let deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];

/*------Cached Element References------*/

const resetDiv = document.getElementById('resetDiv');
const buttonDiv = document.getElementById('difficultyButtons');
const messageEl = document.getElementById('message');
const playArea = document.getElementById('playArea');
const resetBtn = document.getElementById('resetButton');

/*------Event Listeners------*/

playArea.addEventListener('click', function() {

})

resetBtn.addEventListener('click', function() {
    buttonDiv.setAttribute("class", "");
    resetDiv.setAttribute("class", "hidden");
})

buttonDiv.addEventListener('click', function(evt) {
    if (evt.target.innerText) {
        buttonDiv.setAttribute("class", "hidden");
        resetDiv.setAttribute("class", "");
        setDifficulty(difficulty[evt.target.innerText]);
    }
})


/*------Functions------*/

function setDifficulty (noCards) {
    let cardsToShuffle = [];
    let cardToAdd;
    for (let i = 1; i <= noCards; i++) {
        cardToAdd = deck.splice(Math.random() * deck.length + 1, 1);
        cardsToShuffle.push(cardToAdd.toString());
        cardsToShuffle.push(cardToAdd.toString());
    }
    shuffle(cardsToShuffle);
}

function shuffle(cardsIn) {
    console.log(cardsIn)
}