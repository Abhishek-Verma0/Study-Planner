// js for hamburger on nav

const hamburger = document.getElementById("hamburger");
const navOptions = document.getElementById("nav-Option");

hamburger.addEventListener("click", () => {
  navOptions.classList.toggle("active");
});

const subject_DB = "subjects";
const task_DB = "tasks";
const schedule_DB = "schedule";

// Elements
const totalSubjectsEl = document.getElementById("total-subjects");
const totalTasksEl = document.getElementById("total-tasks");
const completedTasksEl = document.getElementById("completed-tasks");
const pendingTasksEl = document.getElementById("pending-tasks");

const todayTasksEl = document.getElementById("today-tasks");
const todayScheduleEl = document.getElementById("today-schedule");
const upcomingEl = document.getElementById("upcoming-deadlines");


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

// renedr dashboard
function renderDashboard() {
  const subjects = getData(subject_DB);
  const tasks = getData(task_DB);
  const schedules = getData(schedule_DB);

  const today = todayDate();

  // stat
  totalSubjectsEl.textContent = subjects.length;
  totalTasksEl.textContent = tasks.length;

  let completed = tasks.filter((t) => t.completed).length;
  completedTasksEl.textContent = completed;
  pendingTasksEl.textContent = tasks.length - completed;

  // today's tasks
  todayTasksEl.innerHTML = "";
  let todayTasks = tasks.filter((t) => t.dueDate === today && !t.completed);

  if (todayTasks.length === 0) {
    todayTasksEl.innerHTML = "<p>No tasks due today</p>";
  } else {
    todayTasks.forEach((task) => {
      todayTasksEl.innerHTML += `
                <div class="card">
                    <strong>${task.title}</strong>
                    <p>${task.subject}</p>
                </div>
            `;
    });
  }

  //  today shedule
  todayScheduleEl.innerHTML = "";
  let todaySlots = schedules.filter((s) => s.date === today);

  if (todaySlots.length === 0) {
    todayScheduleEl.innerHTML = "<p>No study planned for today</p>";
  } else {
    todaySlots.forEach((slot) => {
      todayScheduleEl.innerHTML += `
                <div class="card">
                    <strong>${slot.subject}</strong>
                    <p>${slot.start} - ${slot.end}</p>
                </div>
            `;
    });
  }

  //upcoming deadlines (next 7 days)
  upcomingEl.innerHTML = "";

  let next7 = new Date();
  next7.setDate(next7.getDate() + 7);
  let next7Str = next7.toISOString().split("T")[0];

  let upcomingTasks = tasks.filter(
    (t) => !t.completed && t.dueDate > today && t.dueDate <= next7Str,
  );

  if (upcomingTasks.length === 0) {
    upcomingEl.innerHTML = "<p>No upcoming deadlines</p>";
  } else {
    upcomingTasks.forEach((task) => {
      upcomingEl.innerHTML += `
                <div class="card">
                    <strong>${task.title}</strong>
                    <p>Due: ${task.dueDate}</p>
                </div>
            `;
    });
  }
}


renderDashboard();
