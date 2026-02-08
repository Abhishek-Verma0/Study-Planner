
// js for hamburger on nav

const hamburger = document.getElementById("hamburger");
const navOptions = document.getElementById("nav-Option");

hamburger.addEventListener("click", () => {
  navOptions.classList.toggle("active");
});

const subject_DB = "subjects";
const schedule_DB = "schedule";


const form = document.getElementById("schedule-form");
const subjectDropdown = document.getElementById("schedule-subject");
const dateInput = document.getElementById("schedule-date");

const todayList = document.getElementById("today-list");
const weekList = document.getElementById("week-list");


function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function todayDate() {
  let d = new Date();
  let y = d.getFullYear();
  let m = String(d.getMonth() + 1).padStart(2, "0");
  let day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function setMinDate() {
  dateInput.setAttribute("min", todayDate());
}

// ----------load subjects
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

// ---------checking connflict
function hasConflict(newSlot, schedules) {
  return schedules.some((slot) => {
    if (slot.date !== newSlot.date) return false;

    return newSlot.start < slot.end && newSlot.end > slot.start;
  });
}


function renderSchedule() {
  let schedules = getData(schedule_DB);
  let today = todayDate();

  todayList.innerHTML = "";
  weekList.innerHTML = "";

  let hasToday = false;
  let hasWeek = false;

  // toadys schedules
  schedules.forEach((slot, index) => {
    if (slot.date === today) {
      hasToday = true;
      todayList.appendChild(createCard(slot, index));
    }
  });

  // next 7 days schedule
  let next7 = new Date();
  next7.setDate(next7.getDate() + 7);

  let y = next7.getFullYear();
  let m = String(next7.getMonth() + 1).padStart(2, "0");
  let d = String(next7.getDate()).padStart(2, "0");
  let next7Str = `${y}-${m}-${d}`;

  schedules.forEach((slot, index) => {
    if (slot.date > today && slot.date <= next7Str) {
      hasWeek = true;
      weekList.appendChild(createCard(slot, index));
    }
  });

  // default messages
  if (!hasToday) {
    todayList.innerHTML = "<p>No schedule for today</p>";
  }

  if (!hasWeek) {
    weekList.innerHTML = "<p>No upcoming schedule</p>";
  }
}


// ui
function createCard(slot, index) {
  let card = document.createElement("div");
  card.className = "schedule-card";

  card.innerHTML = `
        <div>
            <strong>${slot.subject}</strong>
            <p>${slot.date} | ${slot.start} - ${slot.end}</p>
        </div>
        <button onclick="deleteSlot(${index})">Delete</button>
    `;

  return card;
}

// adding schedule
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const subject = subjectDropdown.value;
  const date = document.getElementById("schedule-date").value;
  const start = document.getElementById("start-time").value;
  const end = document.getElementById("end-time").value;

  if (!subject || !date || !start || !end) return;

  if (start >= end) {
    alert("End time must be after start time");
    return;
  }

  let schedules = getData(schedule_DB);

  let newSlot = { subject, date, start, end };

  //  handling conflict 
  if (hasConflict(newSlot, schedules)) {
    alert("Time conflict with existing schedule");
    return;
  }

  schedules.push(newSlot);
  saveData(schedule_DB, schedules);

  form.reset();
  setMinDate();
  renderSchedule();
});

// deleting schedule
function deleteSlot(index) {
  let schedules = getData(schedule_DB);
  schedules.splice(index, 1);
  saveData(schedule_DB, schedules);
  renderSchedule();
}








loadSubjects();
setMinDate();
renderSchedule();
