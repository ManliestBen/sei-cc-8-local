var timeLeft= 10;

var timer = setInterval(function() {
    document.getElementById('countdown').textContent = timeLeft + ' seconds remaining.';
    timeLeft -= 1;
    if (timeLeft < 0) {
        document.getElementById('countdown').textContent = 'Finished!'
    }

}, 1000)