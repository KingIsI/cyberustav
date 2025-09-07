
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

  startPauseBtn.addEventListener("click", startPause);
  resetBtn.addEventListener("click", reset);
  focusBtn.addEventListener("click", toggleFocus);
  sessionType.addEventListener("change", (e) =>
    changeSession(parseInt(e.target.value, 10))
  );

  focusStartPause.addEventListener("click", startPause);
  focusReset.addEventListener("click", reset);
  exitFocus.addEventListener("click", toggleFocus);


  updateDisplay();
});

document.addEventListener("DOMContentLoaded", () => {
  const addTaskBtn = document.getElementById("addTaskBtn");
  const newTaskInput = document.getElementById("newTaskInput");
  const prioritySelect = document.getElementById("prioritySelect");
  const todoTasks = document.getElementById("todoTasks");

  let draggedItem = null;

  function createTask(taskText, priority) {
    const li = document.createElement("li");
    li.classList.add("todo-item", priority);
    li.setAttribute("draggable", "true");

    li.innerHTML = `
      <span>${taskText}</span>
      <div class="todo-actions">
        <button class="edit-btn">✏️</button>
        <button class="delete-btn">🗑️</button>
      </div>
    `;

    // Edit button
    li.querySelector(".edit-btn").addEventListener("click", () => {
      const newText = prompt("Edit task:", taskText);
      if (newText) li.querySelector("span").textContent = newText;
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
    });

    li.addEventListener("dragstart", () => {
      draggedItem = li;
      setTimeout(() => li.style.display = "none", 0);
    });

    li.addEventListener("dragend", () => {
      draggedItem.style.display = "flex";
      draggedItem = null;
    });

    li.addEventListener("dragover", (e) => e.preventDefault());

    li.addEventListener("drop", (e) => {
      e.preventDefault();
      if (draggedItem && draggedItem !== li) {
        const allItems = [...todoTasks.children];
        const draggedIndex = allItems.indexOf(draggedItem);
        const droppedIndex = allItems.indexOf(li);

        if (draggedIndex < droppedIndex) {
          todoTasks.insertBefore(draggedItem, li.nextSibling);
        } else {
          todoTasks.insertBefore(draggedItem, li);
        }
      }
    });

    todoTasks.appendChild(li);
  }

  function handleAddTask() {
    const taskText = newTaskInput.value.trim();
    const priority = prioritySelect.value;

    if (taskText !== "") {
      createTask(taskText, priority);
      newTaskInput.value = "";
    }
  }

  addTaskBtn.addEventListener("click", handleAddTask);
  newTaskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleAddTask();
  });
});

const chatContainer = document.getElementById('chatContainer');
const chatInput = document.getElementById('chatInput');
const sendBtn = document.getElementById('sendChatBtn');

function appendMessage(message, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message');
    msgDiv.classList.add(sender === 'bot' ? 'bot-message' : 'user-message');
    msgDiv.innerText = message;
    chatContainer.appendChild(msgDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

sendBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (!message) return;
    appendMessage(message, 'user');
    chatInput.value = '';

    // Simulate bot response
    setTimeout(() => {
        appendMessage("That's interesting! Let's dive into it.", 'bot');
    }, 800);
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendBtn.click();
});
