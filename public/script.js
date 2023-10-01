// Получаем элементы DOM
const messageList = document.getElementById('message-list');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Обработчик нажатия кнопки "Отправить"
sendButton.addEventListener('click', () => {
    const messageText = messageInput.value.trim();

    if (messageText !== '') {
        const messageItem = document.createElement('li');
        messageItem.textContent = messageText;
        messageList.appendChild(messageItem);
        messageInput.value = '';
    }
});

// Обработчик нажатия клавиши "Enter" в поле ввода
messageInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});
