

// js for hamburger on nav

const hamburger = document.getElementById("hamburger");
const navOptions = document.getElementById("nav-Option");

hamburger.addEventListener("click", () => {
  navOptions.classList.toggle("active");
});
