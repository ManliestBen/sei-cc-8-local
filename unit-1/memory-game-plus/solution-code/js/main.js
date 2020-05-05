/*------Constants------*/

const difficulty = {
    "Easy": 5,
    "Medium": 10,
    "Hard": 15
}

/*------Variables------*/

let winTime, seconds, matchCount, card1Val, card1Idx, card2Val, card2Idx, waitingForTimeout;
let turn = 1;
let deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
let cardsInPlay = [];

/*------Cached Element References------*/

const resetDiv = document.getElementById('resetDiv');
const buttonDiv = document.getElementById('difficultyButtons');
const messageEl = document.getElementById('message');
const playArea = document.getElementById('playArea');
const resetBtn = document.getElementById('resetButton');

/*------Event Listeners------*/

buttonDiv.addEventListener('click', function(evt) {
    if (evt.target.innerText) {
        buttonDiv.setAttribute("class", "hidden");
        resetDiv.setAttribute("class", "");
        setDifficulty(difficulty[evt.target.innerText]);
    }
})

resetBtn.addEventListener('click', function() {
    resetDiv.setAttribute("class", "hidden");
    buttonDiv.setAttribute("class", "");
    init();
})

playArea.addEventListener('click', function(evt) {
        handlePick(evt);
})


/*------Functions------*/

init();

setInterval(addSecond, 1000);
    
function init () {
    messageEl.innerHTML = 'Please select a difficulty:'
    matchCount = 0;
    seconds = 0;
    waitingForTimeout = true;
    turn = 1;
    playArea.innerHTML = '';
    cardsInPlay = [];
    deck = ["dA","dQ","dK","dJ","d10","d09","d08","d07","d06","d05","d04","d03","d02","hA","hQ","hK","hJ","h10","h09","h08","h07","h06","h05","h04","h03","h02","cA","cQ","cK","cJ","c10","c09","c08","c07","c06","c05","c04","c03","c02","sA","sQ","sK","sJ","s10","s09","s08","s07","s06","s05","s04","s03","s02"];
    clearInterval(addSecond);
    render();
}

function handlePick (evt) {
    let cardClickedIdx = Array.from(evt.target.parentNode.children).indexOf(evt.target);
    if (cardsInPlay[cardClickedIdx][0] && waitingForTimeout) {
        if (turn === 1) {
            card1Val = cardsInPlay[cardClickedIdx][0];
            card1Idx = cardClickedIdx;
            cardsInPlay[cardClickedIdx] = {1: card1Val}
        } else if (turn === -1) {
            waitingForTimeout = false;
            card2Val = cardsInPlay[cardClickedIdx][0];
            card2Idx = cardClickedIdx;
            cardsInPlay[cardClickedIdx] = {1: card2Val}
            setTimeout(() => {
                compareCards(card1Idx, card1Val, card2Idx, card2Val);
                render();
                waitingForTimeout = true;
            }, 1000); 
        }
        turn *= -1;
    } 
    render();
}

function addSecond() {
    seconds++;
}

function stopTimer() {
    clearInterval(addSecond);
}

function compareCards(card1Idx, card1Val, card2Idx, card2Val) {
    if (card1Val === card2Val) {
        matchCount++;
        messageEl.innerHTML = 'You found a match!';
        cardsInPlay[card1Idx] = {2: card1Val};
        cardsInPlay[card2Idx] = {2: card2Val};
    } else {
        messageEl.innerHTML = 'Nope, try again!';
        cardsInPlay[card1Idx] = {0: card1Val};
        cardsInPlay[card2Idx] = {0: card2Val};
    }
    if (matchCount === cardsInPlay.length / 2){
        winTime = seconds;
        let min, sec;
        min = Math.floor(winTime / 60);
        sec = winTime % 60;
        messageEl.innerHTML = `You found all ${cardsInPlay.length / 2} matches in ${min}:${sec}!`;
    }
}

function setDifficulty (noCards) {
    messageEl.innerText = 'Find a match!';
    let cardsToShuffle = [];
    let cardToAdd; 
    for (let i = 1; i <= noCards; i++) {
        cardToAdd = deck.splice(Math.random()*deck.length + 1, 1)
        cardsToShuffle.push(cardToAdd.toString());
        cardsToShuffle.push(cardToAdd.toString());
    }
    shuffle(cardsToShuffle);
}

function shuffle (cardsIn) {
    let cardToShuffle;
    let cardsOut=[];
    for (let i = 0; i = cardsIn.length; i++) {
        cardToShuffle = cardsIn.splice(Math.random()*cardsIn.length , 1);
        cardsInPlay.push({0:`${cardToShuffle.toString()}`})
        cardsOut.push(cardToShuffle.toString());
    }
    render();
}

function render () {
    playArea.innerHTML = '';
    cardsInPlay.forEach(function(card) {
        // 0 denotes a card face down
        if (card[0]) {
            let appendCard = document.createElement("div");
            appendCard.className = "card large back-red";
            playArea.appendChild(appendCard);
        // 1 denotes a card being guessed    
        } else if (card[1]) {
            let appendCard = document.createElement("div");
            appendCard.className = `card large ${card[1]}`;
            playArea.appendChild(appendCard);
        // 2 denotes a card guessed correctly    
        } else if (card[2]) {
            let appendCard = document.createElement("div");
            appendCard.className = `card large ${card[2]}`;
            playArea.appendChild(appendCard);
        }
    }) 
}

