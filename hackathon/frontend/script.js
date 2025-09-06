

const quotes = [
  "Progress, not perfection.",
  "Learning never exhausts the mind.",
  "Knowledge is power.",
  "Stay curious, keep learning!"
];

let quoteIndex = 0;
const quoteElement = document.querySelector(".navbar .quote");

function changeQuote() {
  quoteElement.style.opacity = 0;
  setTimeout(() => {
    quoteElement.textContent = quotes[quoteIndex];
    quoteElement.style.opacity = 1; 
    quoteIndex = (quoteIndex + 1) % quotes.length;
  }, 500);
}


setInterval(changeQuote, 2000);

changeQuote();

document.addEventListener("DOMContentLoaded", () => {
  const checkBtn = document.querySelector(".check-btn");
  checkBtn.addEventListener("click", () => {
    window.location.href = "#";
  });
});
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".content-section");
  const menuLinks = document.querySelectorAll(".menu-item > a");

  // Function to show one section and hide others
  function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

  menuLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = link.textContent.trim().toLowerCase();

      if (target.includes("home") || target.includes("dashboard")) {
        showSection("dashboard");
      } else if (target.includes("pomodoro")) {
        showSection("pomodoro");
      } else if (target.includes("chatbot")) {
        showSection("chatbot");
      } else if (target.includes("to-do")) {
        showSection("todo");
      } else if (target.includes("mental health")) {
        showSection("mentalHealth");
      }
    });
  });

  showSection("dashboard");

  
  const addTaskBtn = document.getElementById("addTask");
  if (addTaskBtn) {
    addTaskBtn.addEventListener("click", () => {
      const newTaskInput = document.getElementById("newTask");
      if (newTaskInput.value.trim() !== "") {
        const li = document.createElement("li");
        li.innerHTML = `<input type="checkbox"> ${newTaskInput.value}`;
        document.getElementById("todoList").appendChild(li);
        newTaskInput.value = "";
      }
    });
  }
});

