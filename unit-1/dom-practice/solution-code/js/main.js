const colorLookup = {
    "1": "crimson",
    "2": "orangered",
    "3": "#ffff00",
    "4": "lime",
    "5": "rgb(72, 72, 199)",
    "6": () => {colorCycle()}
};

const mathOps = {
    "+": (x, y) => {return x + y},
    "-": (x, y) => {return x - y},
    "*": (x, y) => {return x * y},
    "/": (x, y) => {return x / y},
};
const tacoCatLookup = {
    'taco': 'https://www.pngitem.com/pimgs/m/72-720776_taco-pdf-hd-png-download.png',
    'cat': 'https://media.wired.com/photos/5cdefb92b86e041493d389df/master/pass/Culture-Grumpy-Cat-487386121.jpg',
    'tacocat': 'https://cdn.dribbble.com/users/977419/screenshots/3414137/tacocat2.png'
}
let r=255, g=0, b=0;
let colorInterval;
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
const tacoBtn = document.getElementById('tacoButton');
const catBtn = document.getElementById('catButton');
const tacoCatBtn = document.getElementById('tacoCatButton');
const tacoCatBtns = document.getElementById('tacoCatButtons');
const tacoCatZone = document.getElementById('tacoCatZone');
const rainbowBtn = document.getElementById('button6');

tacoCatBtns.addEventListener('click', function(evt) {
    appendTacoCat(evt.target.innerText.toLowerCase())
});

colorResetBtn.addEventListener('click', function() {
    document.body.style.backgroundColor = 'cornflowerblue';
    init();
});

messageBtn.addEventListener('click', function() {
    messageEl.innerText = messageInput.value;
});

colorButtons.forEach(function(button) {
    button.addEventListener('click', function(evt) {
        if (evt.target.innerText === '6') {
            colorLookup['6']();
            evt.target.innerText = 'STOP';
        } else if (evt.target.innerText === 'STOP') {
            clearInterval(colorInterval);
            evt.target.innerText = '6';
        }
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
    tacoCatZone.innerHTML = '';
}

function appendTacoCat(tacoOrCat) {
    let tempImg = document.createElement('img');
    tempImg.width = 100;
    tempImg.src = tacoCatLookup[tacoOrCat];
    tacoCatZone.appendChild(tempImg);
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

function colorCycle(){
    if (colorInterval) {
        clearInterval(colorInterval)
    }
    colorInterval = setInterval(rainbowFade, 5);
}

setInterval(function rainbowButton() {
    if(r > 0 && b == 0){ r--; g++; }
    if(g > 0 && r == 0){ g--; b++; }
    if(b > 0 && g == 0){ r++; b--; }
    rainbowBtn.style.backgroundColor =`rgb(${r},${g},${b})`;
},5)

function rainbowFade (){
    if(r > 0 && b == 0){ r--; g++; }
    if(g > 0 && r == 0){ g--; b++; }
    if(b > 0 && g == 0){ r++; b--; }
    document.body.style.backgroundColor =`rgb(${r},${g},${b})`;
}
