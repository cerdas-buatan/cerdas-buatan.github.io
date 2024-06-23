document.getElementById('user-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatBody = document.getElementById('chat-body');

    // Add user message to chat
    const userMessage = document.createElement('p');
    userMessage.className = 'user-message';
    userMessage.textContent = userInput;
    chatBody.appendChild(userMessage);

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Scroll to the bottom of chat
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
        const botMessage = document.createElement('p');
        botMessage.className = 'bot-message';
        botMessage.textContent = getBotResponse();
        chatBody.appendChild(botMessage);

        // Scroll to the bottom of chat
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function getBotResponse() {
    const responses = [
        "That's funny! 😂",
        "I see what you did there! 😜",
        "Tell me more! 🤔",
        "Haha, good one! 😄",
        "You’re hilarious! 🤣"
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}
