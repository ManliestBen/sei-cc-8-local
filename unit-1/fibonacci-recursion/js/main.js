const buttonA = document.getElementById('buttonA');
const buttonB = document.getElementById('buttonB');
const messageA = document.getElementById('messageA');
const messageB = document.getElementById('messageB');
const inputA = document.getElementById('inputA');
const inputB = document.getElementById('inputB');

buttonA.addEventListener('click', function() {
    let t0 = performance.now();
    let result = solutionA(parseInt(inputA.value));
    let t1 = performance.now();
    messageA.innerText = `Linear time: ${parseFloat((t1 - t0).toFixed(4))} milliseconds.  Result: ${result}`
});
buttonB.addEventListener('click', function() {
    let t0 = performance.now();
    let result = solutionB(parseInt(inputB.value));
    let t1 = performance.now();
    messageB.innerText = `Exponential time: ${parseFloat((t1 - t0).toFixed(4))} milliseconds.  Result: ${result}`
});

function solutionA(num){
    let a = 1, b = 0, temp;
    while (num >= 0){
      temp = a;
      a = a + b;
      b = temp;
      num--;
    }
    return b;
}

function solutionB(num) {
    if (num <= 1) return 1;
    return solutionB(num - 1) + solutionB(num - 2);
}