async function sendMessage() {
  const input = document.getElementById("user-input");
  const chatBox = document.getElementById("chat-box");
  const userText = input.value.trim();
  if (!userText) return;

  chatBox.innerHTML += `<div><strong>You:</strong> ${userText}</div>`;
  input.value = "";

  const response = await fetch("http://localhost:5002/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message: userText })
  });

  const data = await response.json();
  const botReply = data.reply;

  chatBox.innerHTML += `<div><strong>Gemini:</strong> ${botReply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
