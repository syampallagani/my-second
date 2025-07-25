// CLOCK
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour12: false });
  document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock(); // initial call

// STOPWATCH
let stopwatchInterval;
let startTime;
let elapsedTime = 0;

const stopwatchDisplay = document.getElementById("stopwatch");

function updateStopwatch() {
  const now = Date.now();
  const time = elapsedTime + (stopwatchInterval ? now - startTime : 0);

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  stopwatchDisplay.textContent =
    `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMs(milliseconds)}`;
}

function pad(num) {
  return num.toString().padStart(2, "0");
}

function padMs(num) {
  return num.toString().padStart(3, "0");
}

document.getElementById("startBtn").onclick = () => {
  if (!stopwatchInterval) {
    startTime = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 10);
  }
};

document.getElementById("stopBtn").onclick = () => {
  if (stopwatchInterval) {
    elapsedTime += Date.now() - startTime;
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
};

document.getElementById("resetBtn").onclick = () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  elapsedTime = 0;
  updateStopwatch();
};

updateStopwatch();
