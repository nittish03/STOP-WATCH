let timerInterval;
let elapsedTime = 0;
let isRunning = false;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps').querySelector('ul');

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000) % 60;
    const minutes = Math.floor(ms / 60000) % 60;
    const hours = Math.floor(ms / 3600000);

    const pad = (num) => (num < 10 ? '0' : '') + num;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function updateDisplay() {
    display.textContent = formatTime(elapsedTime);
}

document.getElementById('startBtn').addEventListener('click', () => {
    if (!isRunning) {
        isRunning = true;
        const startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 1000);
    }
});

document.getElementById('pauseBtn').addEventListener('click', () => {
    if (isRunning) {
        isRunning = false;
        clearInterval(timerInterval);
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    isRunning = false;
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = '';
});

document.getElementById('lapBtn').addEventListener('click', () => {
    if (isRunning) {
        const lapTime = formatTime(elapsedTime);
        const lapItem = document.createElement('li');
        lapItem.textContent = lapTime;
        lapsList.appendChild(lapItem);
    }
});

updateDisplay();
