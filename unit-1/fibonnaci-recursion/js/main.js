const buttonA = document.getElementById('buttonA');
const buttonB = document.getElementById('buttonB');
const messageA = document.getElementById('messageA');
const messageB = document.getElementById('messageB');
const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');

buttonA.addEventListener('click', function() {
    solutionA(parseInt(inputA.value))
});
buttonB.addEventListener('click', function() {
    solutionB(parseInt(inputB.value))
});


function solutionA(num){
    let a = 1, b = 0, temp;
    let t0 = performance.now();
    
    while (num >= 0){
      temp = a;
      a = a + b;
      b = temp;
      num--;
    }
    let t1 = performance.now();
    messageA.innerText = `Linear time: ${parseFloat((t1 - t0).toFixed(4))} milliseconds.`
    return b;
}

function solutionB(num) {
    let t0 = performance.now();
    if (num <= 1) return 1;
    let b = solutionB(num - 1) + solutionB(num - 2);
    let t1 = performance.now();
    messageB.innerText = `Exponential time: ${parseFloat((t1 - t0).toFixed(4))} milliseconds.`
}