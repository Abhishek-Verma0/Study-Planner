// js for hamburger on nav

const hamburger = document.getElementById("hamburger");
const navOptions = document.getElementById("nav-Option");

hamburger.addEventListener("click", () => {
  navOptions.classList.toggle("active");
});

//  logic to save subject form to local storage

let form = document.getElementById("addSub");
let subjectList = document.getElementById("subject-List");

window.addEventListener("DOMContentLoaded", displaySub);

//  catching the event submit by form

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("sub-Name").value;
  const hours = document.getElementById("sub-Hours").value;
  const priority = document.getElementById("sub-priority").value;

  //  subject obj to store the values in local storage

  const subject = {
    id: Date.now(),
    name: name,
    hours: hours,
    priority: priority,
  };

  //  check if data exist if not make an array of subjects
  let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

  //  adding new subject
  subjects.push(subject);
  //  saving updated data to local storage
  localStorage.setItem("subjects", JSON.stringify(subjects));

  form.reset();

  displaySub();
  console.log("saved to local storage");
});

//  function to display existing subject

function displaySub() {
  let subjects = JSON.parse(localStorage.getItem("subjects")) || [];
  subjectList.innerHTML = "";
  //  showing message for no subjects
  if (subjects.length === 0) {
    subjectList.innerHTML = "<p>No subjects found</p>";
    return;
  }

  //  rendering all subject through loop

  subjects.forEach(function (subject) {
    // making subject card
    let card = document.createElement("div");
    card.className = "subject-card";
    card.setAttribute("data-id", subject.id); // ADDED THIS LINE

    card.innerHTML = `
      <div class="view-mode">
        <h3>${subject.name}</h3>
        <p>Target Hours: ${subject.hours} hours/week</p>
        <p>Priority: ${subject.priority}</p>
        <div class="card-buttons">
          <button class="edit-btn" onclick="editSubject(${subject.id})">Edit</button>
          <button class="delete-btn" onclick="deleteSubject(${subject.id})">Delete</button>
        </div>
      </div>

      <div class="edit-mode" style="display: none;">
        <input type="text" class="edit-name" value="${subject.name}" placeholder="Subject name">
        <input type="number" class="edit-hours" value="${subject.hours}" placeholder="Target hours" min="0">
        <select class="edit-priority">
          <option value="Low" ${subject.priority === "Low" ? "selected" : ""}>Low</option>
          <option value="Medium" ${subject.priority === "Medium" ? "selected" : ""}>Medium</option>
          <option value="High" ${subject.priority === "High" ? "selected" : ""}>High</option>
        </select>
        <div class="card-buttons">
          <button class="save-btn" onclick="saveSubject(${subject.id})">Save</button>
          <button class="cancel-btn" onclick="cancelEdit(${subject.id})">Cancel</button>
        </div>
      </div>
    `;

    // append card to the list
    subjectList.appendChild(card);
  });
}

/**  logic to delete a subject */

function deleteSubject(id) {
  if (confirm("Are you sure you want to delete this subject?")) {
    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    //  filtering the subjects with help of id
    subjects = subjects.filter(function (subject) {
      return subject.id !== id;
    });
    // save updated subjects array after filter
    localStorage.setItem("subjects", JSON.stringify(subjects));
    displaySub();
    console.log("subject deleted");
  }
}

//  logic for editing the subject

function editSubject(id) {
  let card = document.querySelector(`[data-id="${id}"]`);
  let viewMode = card.querySelector(".view-mode");
  let editMode = card.querySelector(".edit-mode");

  // hide view mode and show edit mode logic
  viewMode.style.display = "none";
  editMode.style.display = "block";
}

// cancel editing
function cancelEdit(id) {
  let card = document.querySelector(`[data-id="${id}"]`);
  let viewMode = card.querySelector(".view-mode");
  let editMode = card.querySelector(".edit-mode");

  viewMode.style.display = "block";
  editMode.style.display = "none";
}

// save  hte edited subject
function saveSubject(id) {
  let card = document.querySelector(`[data-id="${id}"]`);

  // get new values from input fields
  let newName = card.querySelector(".edit-name").value;
  let newHours = card.querySelector(".edit-hours").value;
  let newPriority = card.querySelector(".edit-priority").value;

  // get all subjects from localStorage
  let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

  // find and update the specific subject
  subjects = subjects.map(function (subject) {
    if (subject.id === id) {
      return {
        id: id,
        name: newName,
        hours: newHours,
        priority: newPriority,
      };
    }
    return subject;
  });

  // save updated subjects to localStorage
  localStorage.setItem("subjects", JSON.stringify(subjects));

  displaySub();

  console.log("subject edited");
}
