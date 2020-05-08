const colorLookup = {
    "1": "crimson",
    "2": "orangered",
    "3": "#ffff00",
    "4": "lime",
    "5": "rgb(72, 72, 199)"
};

const mathOps = {
    "+": (x, y) => {return x + y},
    "-": (x, y) => {return x - y},
    "*": (x, y) => {return x * y},
    "/": (x, y) => {return x / y},
};

let raveInterval;

const colorButtons = document.querySelectorAll('.backgroundButton');
const messageEl = document.getElementById('message');
const messageInput = document.getElementById('inputMessage');
const messageBtn = document.getElementById('messageButton');
const colorResetBtn = document.getElementById('colorResetButton');
const showColors = document.getElementById('showColors');
const hideColors = document.getElementById('hideColors');
const displayBtns = document.getElementById('displayButtons');
const colorButtonDiv = document.getElementById('buttonRow');
const plusBtn = document.getElementById('plus');
const minusBtn = document.getElementById('minus');
const timesBtn = document.getElementById('times');
const dividedBtn = document.getElementById('divided');
const mathDiv = document.getElementById('operators');
const mathResult = document.getElementById('mathResult');
const input1 = document.getElementById('mathInput1');
const input2 = document.getElementById('mathInput2');
const elements = document.getElementsByTagName('*');
const raveOn = document.getElementById('raveOn');
const raveOff = document.getElementById('raveOff');

colorResetBtn.addEventListener('click', function() {
    document.body.style.backgroundColor = 'cornflowerblue';
});

messageBtn.addEventListener('click', function() {
    messageEl.innerText = messageInput.value;
});

colorButtons.forEach(function(button) {
    button.addEventListener('click', function(evt) {
        document.body.style.backgroundColor = colorLookup[evt.target.innerText];
    });
});

displayBtns.addEventListener('click', function(evt) {
    (evt.target.innerText === 'Hide Colors' ? 
    (colorButtonDiv.style.display = "none", hideColors.style.display = "none", showColors.style.display = "")
    : 
    (colorButtonDiv.style.display = "", hideColors.style.display = "", showColors.style.display = "none" )
    ) 
});

mathDiv.addEventListener('click', function(evt) {
    mathResult.value = mathOps[evt.target.innerText](parseInt(input1.value), parseInt(input2.value));
});

raveOn.addEventListener('click', () => {
    if (raveInterval) {
        clearInterval(raveInterval)
    }
    raveInterval = setInterval(rave, 100);
    raveOn.style.display = "none";
    raveOff.style.display = "";
});

raveOff.addEventListener('click', () => {
    location.reload();
});

init();

function init() {
    showColors.style.display = "none";
    raveOff.style.display = "none";
}

function rave() {
    for (var i = elements.length - 1; i >= 0; i--) { 
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256); 
        elements[i].style.color = '#'+r.toString(16)+g.toString(16)+b.toString(16);
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        elements[i].style.backgroundColor = '#'+r.toString(16)+g.toString(16)+b.toString(16);
    };    
}


