
const quotes = [
  "Progress, not perfection.",
  "Learning never exhausts the mind.",
  "Knowledge is power.",
  "Stay curious, keep learning!",
  "We should never give up!"
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
  const sections = document.querySelectorAll(".content-section");
  const submenuLinks = document.querySelectorAll(".submenu a");


  function showSection(id) {
    sections.forEach(sec => sec.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }

 
  submenuLinks.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.textContent.trim().toLowerCase();

      if (target.includes("dashboard")) {
        showSection("dashboard");
      } else if (target.includes("start timer")) {
        showSection("pomodoro");
      } else if (target.includes("ai chat")) {
        showSection("chatbot");
      } else if (target.includes("tasks")) {
        showSection("todo");
      } else if (target.includes("meditation")) {
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


  const checkBtn = document.querySelector(".check-btn");
  if (checkBtn) {
    checkBtn.addEventListener("click", () => {
      alert("✅ Mood check-in completed!");
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  // ===== Pomodoro Timer =====
  const startPauseBtn = document.getElementById("startPausePomodoro");
  const resetBtn = document.getElementById("resetPomodoro");
  const focusBtn = document.getElementById("focusMode");
  const sessionType = document.getElementById("sessionType");
  const timerDisplay = document.getElementById("timerDisplay");
  const progressBar = document.getElementById("pomodoroProgress");
  const historyList = document.getElementById("pomodoroHistory");

  // Focus Overlay elements
  const focusOverlay = document.getElementById("focusOverlay");
  const focusTimer = document.getElementById("focusTimer");
  const focusStartPause = document.getElementById("focusStartPause");
  const focusReset = document.getElementById("focusReset");
  const exitFocus = document.getElementById("exitFocus");

  let timer = null;
  let isRunning = false;
  let sessionDuration = 25 * 60;
  let timeLeft = sessionDuration;

  function fmt(n) {
    return n.toString().padStart(2, "0");
  }

  function updateDisplay() {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    const formatted = `${fmt(m)}:${fmt(s)}`;
    timerDisplay.textContent = formatted;
    focusTimer.textContent = formatted; // keep overlay in sync
    const pct = ((sessionDuration - timeLeft) / sessionDuration) * 100;
    progressBar.style.width = `${Math.max(0, Math.min(100, pct))}%`;
  }

  function tick() {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
    } else {
      clearInterval(timer);
      timer = null;
      isRunning = false;
      startPauseBtn.textContent = "▶ Start";
      focusStartPause.textContent = "▶ Start";
      addHistory("✅ Completed session");
      alert("🎉 Time’s up! Take a break.");
    }
  }

  function startPause() {
    if (isRunning) {
      // pause
      clearInterval(timer);
      timer = null;
      isRunning = false;
      startPauseBtn.textContent = "▶ Resume";
      focusStartPause.textContent = "▶ Resume";
      addHistory("⏸ Paused");
    } else {
      // start
      isRunning = true;
      startPauseBtn.textContent = "⏸ Pause";
      focusStartPause.textContent = "⏸ Pause";
      if (!timer) timer = setInterval(tick, 1000);
      addHistory("▶ Started");
    }
  }

  function reset() {
    clearInterval(timer);
    timer = null;
    isRunning = false;
    timeLeft = sessionDuration;
    updateDisplay();
    startPauseBtn.textContent = "▶ Start";
    focusStartPause.textContent = "▶ Start";
    addHistory("⟳ Reset");
  }

  function changeSession(mins) {
    sessionDuration = mins * 60;
    timeLeft = sessionDuration;
    updateDisplay();
    startPauseBtn.textContent = "▶ Start";
    focusStartPause.textContent = "▶ Start";
    addHistory(`🔁 Mode: ${mins} min`);
  }

  function toggleFocus() {
    if (focusOverlay.classList.contains("hidden")) {
      focusOverlay.classList.remove("hidden");
      document.documentElement.requestFullscreen?.();
      addHistory("🎯 Entered Focus Mode");
    } else {
      focusOverlay.classList.add("hidden");
      document.exitFullscreen?.();
      addHistory("🚪 Exited Focus Mode");
    }
  }

  function addHistory(text) {
    const li = document.createElement("li");
    li.textContent = `${new Date().toLocaleTimeString()} — ${text}`;
    historyList.prepend(li);
  }

  // ===== Event Listeners =====
  startPauseBtn.addEventListener("click", startPause);
  resetBtn.addEventListener("click", reset);
  focusBtn.addEventListener("click", toggleFocus);
  sessionType.addEventListener("change", (e) =>
    changeSession(parseInt(e.target.value, 10))
  );

  // Focus overlay buttons
  focusStartPause.addEventListener("click", startPause);
  focusReset.addEventListener("click", reset);
  exitFocus.addEventListener("click", toggleFocus);

  // Init
  updateDisplay();
});
