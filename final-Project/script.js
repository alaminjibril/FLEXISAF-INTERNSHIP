let timer;
let duration = 25 * 60;
let timeLeft = duration;
let isRunning = false;
let pomodoroCount = localStorage.getItem('pomodoros') || 0;

const display = document.getElementById('time');
const alarm = document.getElementById('alarm-sound');
const pomodoroDisplay = document.getElementById('pomodoroCount');
const toggleTheme = document.getElementById('toggle-theme');

const buttons = {
  start: document.getElementById('start'),
  pause: document.getElementById('pause'),
  reset: document.getElementById('reset'),
  pomo: document.getElementById('pomodoro'),
  short: document.getElementById('short-break'),
  long: document.getElementById('long-break'),
};

// Timer display update
function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  display.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  updateProgressBar();
}

// Progress bar
function updateProgressBar() {
  const percent = 100 - (timeLeft / duration) * 100;
  const progress = document.querySelector('#progress-bar::after');
  if (progress) {
    progress.style.width = percent + '%';
  } else {
    document.querySelector('#progress-bar').style.setProperty('--width', percent + '%');
  }
}

// Start timer
function startTimer() {
  if (!isRunning) {
    isRunning = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        alarm.play();
        isRunning = false;
        if (duration === 25 * 60) {
          pomodoroCount++;
          localStorage.setItem('pomodoros', pomodoroCount);
          pomodoroDisplay.textContent = pomodoroCount;
        }
      }
    }, 1000);
  }
}

// Pause timer
function pauseTimer() {
  clearInterval(timer);
  isRunning = false;
}

// Reset timer
function resetTimer(newDuration = 25 * 60) {
  clearInterval(timer);
  duration = newDuration;
  timeLeft = newDuration;
  isRunning = false;
  updateDisplay();
  updateProgressBar();
}

// Set mode
function setMode(button, time) {
  document.querySelectorAll('.timer-settings button').forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  resetTimer(time);
}

// Dark mode
toggleTheme.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode');
  toggleTheme.textContent = document.body.classList.contains('dark-mode')
    ? '☀️ Light Mode'
    : '🌙 Dark Mode';
});

// Button listener
buttons.start.addEventListener('click', startTimer);
buttons.pause.addEventListener('click', pauseTimer);
buttons.reset.addEventListener('click', () => resetTimer(duration));
buttons.pomo.addEventListener('click', () => setMode(buttons.pomo, 25 * 60));
buttons.short.addEventListener('click', () => setMode(buttons.short, 5 * 60));
buttons.long.addEventListener('click', () => setMode(buttons.long, 15 * 60));


let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${task.name} - <strong>${task.status}</strong></span>
      <div>
        ${task.status === 'In Progress' 
          ? `<button class="btn-complete" onclick="finishTask(${index})">Complete</button>` 
          : ''
        }
        <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function addTask() {
  const input = document.getElementById('taskInput');
  const name = input.value.trim();
  if (name) {
    tasks.push({ name, status: 'In Progress' });
    input.value = '';
    renderTasks();
  }
}

function finishTask(index) {
  tasks[index].status = 'Finished';
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

document.getElementById('addTask').addEventListener('click', addTask);

// Expose functions to global scope
window.finishTask = finishTask;
window.deleteTask = deleteTask;

pomodoroDisplay.textContent = pomodoroCount;
updateDisplay();
setMode(buttons.pomo, 25 * 60);
renderTasks();
