//  logic to save subject form to local storage


let form = document.getElementById("addSub")


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