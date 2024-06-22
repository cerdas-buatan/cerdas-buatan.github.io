function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;

    const chatBody = document.getElementById('chat-body');

    // Add user message to chat
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.innerHTML = `<p>${userInput}</p>`;
    chatBody.appendChild(userMessageDiv);

    // Clear the input field
    document.getElementById('user-input').value = '';

    // Scroll to the bottom of chat
    chatBody.scrollTop = chatBody.scrollHeight;

    // Simulate bot response
    setTimeout(() => {
        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message', 'bot-message');
        botMessageDiv.innerHTML = `<p>${getBotResponse()}</p>`;
        chatBody.appendChild(botMessageDiv);

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
