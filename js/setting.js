// js for hamburger on nav

const hamburger = document.getElementById("hamburger");
const navOptions = document.getElementById("nav-Option");

hamburger.addEventListener("click", () => {
  navOptions.classList.toggle("active");
});



const exportBtn = document.getElementById("export-btn");
const resetBtn = document.getElementById("reset-btn");
const themeBtn = document.getElementById("theme-btn");

// ---------- Load Theme ----------
function loadTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    document.body.classList.add("dark");
  }
}

loadTheme();

// ---------- Toggle Theme ----------
themeBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
});

// ---------- Export Data ----------
exportBtn.addEventListener("click", function () {
  const data = {
    subjects: JSON.parse(localStorage.getItem("subjects")) || [],
    tasks: JSON.parse(localStorage.getItem("tasks")) || [],
    schedule: JSON.parse(localStorage.getItem("schedule")) || [],
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "study-planner-data.json";
  a.click();

  URL.revokeObjectURL(url);
});

// ---------- Reset All Data ----------
resetBtn.addEventListener("click", function () {
  const confirmReset = confirm("Delete all data?");
  if (!confirmReset) return;

  localStorage.clear();
  alert("All data deleted");
  location.reload();
});
