const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const path = require('path');

const users = {}; // Сохранение списка пользователей

app.use('/other-directory', express.static(path.join(__dirname, 'other-directory')));

io.on('connection', (socket) => {
  console.log('Пользователь подключился');

  // Обработка входа пользователя
  socket.on('login', (data) => {
    // Проверка пароля (здесь упрощенный пример, в реальном приложении пароли должны храниться безопасно)
    if (data.password === 'secret') {
      users[socket.id] = data.username;
      socket.emit('login-success', data.username);
    } else {
      socket.emit('login-fail', 'Неправильный пароль');
    }
  });

  // Обработка отправки сообщения
  socket.on('chat-message', (message) => {
    const username = users[socket.id];
    if (username) {
      io.emit('chat-message', { username, message });
    }
  });

  // Обработка отключения пользователя
  socket.on('disconnect', () => {
    const username = users[socket.id];
    if (username) {
      delete users[socket.id];
    }
    console.log('Пользователь отключился');
  });
});

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
