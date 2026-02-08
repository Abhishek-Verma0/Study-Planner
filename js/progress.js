// js for hamburger on nav

const hamburger = document.getElementById("hamburger");
const navOptions = document.getElementById("nav-Option");

hamburger.addEventListener("click", () => {
  navOptions.classList.toggle("active");
});

const taks_DB = "tasks";

const totalEl = document.getElementById("total-tasks");
const completedEl = document.getElementById("completed-tasks");
const pendingEl = document.getElementById("pending-tasks");
const missedEl = document.getElementById("missed-tasks");

const progressFill = document.getElementById("progress-fill");
const percentageText = document.getElementById("percentage-text");
const performanceMsg = document.getElementById("performance-msg");

function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function todayDate() {
  let d = new Date();
  let y = d.getFullYear();
  let m = String(d.getMonth() + 1).padStart(2, "0");
  let day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function renderProgress() {
  let tasks = getData(taks_DB);
  let today = todayDate();

  let total = tasks.length;
  let completed = tasks.filter((t) => t.completed).length;
  let pending = total - completed;

  let missed = tasks.filter((t) => !t.completed && t.dueDate < today).length;

  // update numbers
  totalEl.textContent = total;
  completedEl.textContent = completed;
  pendingEl.textContent = pending;
  missedEl.textContent = missed;

  // percent
  let percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  progressFill.style.width = percent + "%";
  percentageText.textContent = percent + "%";

  //msg perfromance
  if (percent >= 80) {
    performanceMsg.textContent = "Excellent Progress!";
  } else if (percent >= 50) {
    performanceMsg.textContent = "Good, keep improving.";
  } else {
    performanceMsg.textContent = "Needs improvement.";
  }
}

renderProgress();
