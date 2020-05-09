var numArray = [];
var colorList = ["red", "orange", "yellow", "green", "blue"];
var sum = 0;

function randomColor() {
    let randIdx = Math.floor((Math.random() * 5));
    let randColor = colorList[randIdx];
    return randColor;
}
function handleClick() {
    let randNum = Math.floor((Math.random() * 100)) + 1;
    document.getElementById('numberBox').value = randNum;
    numArray.push(randNum);
    document.getElementById('numberBox').style.color = randomColor();
    sum += randNum;
    document.getElementById('sum').textContent = sum;
}

document.getElementById('btn').addEventListener('click', handleClick);