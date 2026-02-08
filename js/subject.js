//  logic to save subject form to local storage


let form = document.getElementById("addSub")
let subjectList = document.getElementById("subject-List")


window.addEventListener("DOMContentLoaded", displaySub);

//  catching the event submit by form

form.addEventListener("submit", function(e){
    e.preventDefault()

    const name = document.getElementById("sub-Name").value
    const hours = document.getElementById("sub-Hours").value
    const priority = document.getElementById("sub-priority").value;

    //  subjct obj to  store the values in local storage

    const subject = {
        name: name,
        hours: hours,
        priority: priority,
    };

    //  check if data exist if not make an array of subjects
    let subjects = JSON.parse(localStorage.getItem("subjects")) || [];

    //  adding new subject
    subjects.push(subject)
    //  saving updated data to lcoal storage
    localStorage.setItem("subjects", JSON.stringify(subjects));
    
    form.reset()
    console.log("saved to local storge")
    console.log(subjects)
})




//  function to display exsisting subject

function displaySub() {
    let subjects = JSON.parse(localStorage.getItem("subjects") || [])
    subjectList.innerHTML = ""
    //  showing message for no subjects
    if (subjects.length === 0) {
        subjectList.innerHTML = "<p>No subjects found</p>";
        return;
    }

    //  rendring all subject thorugh loop

    subjects.forEach(function (subject) {
      // making  subject card
      let card = document.createElement("div");
      card.className = "subject-card";
      card.innerHTML = `
            <h3>${subject.name}</h3>
            <p>Target Hours: ${subject.hours} hours/week</p>
            <p>Priority: ${subject.priority}</p>
            <div class="card-buttons">
                <button class="edit-btn" onclick="editSubject(${subject.id})">Edit</button>
                <button class="delete-btn" onclick="deleteSubject(${subject.id})">Delete</button>
            </div>
        `;

      // append card to the list
      subjectList.appendChild(card);
    });
    
}