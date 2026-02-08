const task_DB = "tasks";
const subject_DB = "subjects";

//  accesing elements  from html
const form = document.getElementById("task-Form");
const subjectDropdown = document.getElementById("task-subject");
const dateInput = document.getElementById("task-date");

const pending_taksList = document.getElementById("pending-list");
const all_taskList = document.getElementById("task-list");

const completed_tasks = document.getElementById("task-completed");
const notDoneTask = document.getElementById("notDone-task");

//  function to parse local storage data from string to JSON object
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

//  function to save data to local storage after converting into strings
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// function to get local date of pc  (YYYY-MM-DD)
function todayDate() {
  let d = new Date();
  let year = d.getFullYear();
  let month = String(d.getMonth() + 1).padStart(2, "0");
  let day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// banning calendar to use past dates for adding new task
function setMinDate() {
  dateInput.setAttribute("min", todayDate());
}

//  maknig a drop down menu for exsiting subject in localstorage for task form
function loadSubjects() {
  let subjects = getData(subject_DB);
  subjectDropdown.innerHTML = '<option value="">Select Subject</option>';

  subjects.forEach((sub) => {
    let option = document.createElement("option");
    option.value = sub.name;
    option.textContent = sub.name;
    subjectDropdown.appendChild(option);
  });
}

// function to render tasks
function renderTasks() {
  let tasks = getData(task_DB);
  let today = todayDate();

  pending_taksList.innerHTML = "";
  all_taskList.innerHTML = "";


  let completed = tasks.filter((t) => t.completed).length;
  let pending = tasks.length - completed;

  completed_tasks.innerHTML = `<h3>Completed</h3><p>${completed}</p>`;
  notDoneTask.innerHTML = `<h3>Incomplete</h3><p>${pending}</p>`;

  // render for pending tasks
  tasks.forEach((task, index) => {
    if (!task.completed && task.dueDate >= today) {
      pending_taksList.appendChild(createPendingCard(task, index));
    }
  });

  // rendering task which are completed recnetly or missed
  let recent = tasks.filter((task) => {
    if (task.completed) return true;
    if (!task.completed && task.dueDate < today) return true;
    return false;
  });

  recent = recent.slice(-50).reverse();

  recent.forEach((task) => {
    all_taskList.appendChild(createRecentCard(task));
  });
}

// creating UI for pending tasks dynamically
function createPendingCard(task, index) {
  let card = document.createElement("div");
  card.className = "task-card";

  card.innerHTML = `
        <div>
            <strong>${task.title}</strong>
            <span class="status-tag status-pending">Pending</span>
            <p> Subject - ${task.subject}  |  Due: ${task.dueDate}</p>
        </div>

        <div class="task-actions">
            <button onclick="markDone(${index})">Done</button>
            <button onclick="deleteTask(${index})">Delete</button>
        </div>
    `;

  return card;
}

// recent task with  no function of further edititng and marking status of task
function createRecentCard(task) {
  let card = document.createElement("div");
  card.className = "task-card";

  let today = todayDate();
  let statusText = "";
  let statusClass = "";

  if (task.completed) {
    statusText = "Completed";
    statusClass = "status-done";
    card.classList.add("completed");
  } else if (task.dueDate < today) {
    statusText = "Missed";
      statusClass = "status-pending";
      card.classList.add("incomplete");
  }

  card.innerHTML = `
        <div>
            <strong>${task.title}</strong>
            <span class="status-tag ${statusClass}">
                ${statusText}
            </span>
            <p>${task.subject} | Due: ${task.dueDate}</p>
        </div>
    `;

  return card;
}

// adding task as soon form submitted
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const title = document.getElementById("task-title").value.trim();
  const subject = document.getElementById("task-subject").value;
  const date = dateInput.value;
  let today = todayDate();

  if (!title || !subject || !date) return;

  // checking if date is not from past dates
  if (date < today) {
    alert("Due date cannot be of past");
    return;
  }

  let tasks = getData(task_DB);

  tasks.push({
    title,
    subject,
    dueDate: date,
    completed: false,
  });

  saveData(task_DB, tasks);
  form.reset();
  setMinDate(); 
  renderTasks();
});

// function to  mark done task
function markDone(index) {
  let tasks = getData(task_DB);
  let today = todayDate();

  // can't complete after deadline  so no marking
  if (tasks[index].dueDate < today) {
    alert("Deadline passed. Cannot complete this task.");
    return;
  }

  //  completion of task perm
  tasks[index].completed = true;
  saveData(task_DB, tasks);
  renderTasks();
}

// deletting task function if due date not passed
function deleteTask(index) {
  let tasks = getData(task_DB);
  tasks.splice(index, 1);
  saveData(task_DB, tasks);
  renderTasks();
}


//  calling function to  render tasks and data 

loadSubjects();
setMinDate();
renderTasks();
