const socket = io();

const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginButton = document.getElementById('login-btn');
const messageInput = document.getElementById('message');
const sendButton = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');

loginButton.addEventListener('click', () => {
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (username && password) {
    socket.emit('login', { username, password });
  }
});

socket.on('login-success', (username) => {
  // Пользователь успешно вошел
  usernameInput.disabled = true;
  passwordInput.disabled = true;
  loginButton.disabled = true;
  messageInput.disabled = false;
  sendButton.disabled = false;
});

socket.on('login-fail', (message) => {
  // Неправильный пароль
  alert(message);
});

sendButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message) {
    socket.emit('chat-message', message);
    messageInput.value = '';
  }
});

socket.on('chat-message', (data) => {
  const messageItem = document.createElement('li');
  messageItem.textContent = `${data.username}: ${data.message}`;
  chatMessages.appendChild(messageItem);
});
