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
    const userMessageContainer = document.createElement('div');
    userMessageContainer.className = 'message-container user-message-container';

    const userMessage = document.createElement('p');
    userMessage.className = 'user-message';
    userMessage.textContent = userInput;
    chatBody.appendChild(userMessage);
    chatBody.appendChild(userMessageContainer);


    // Clear the input field
    document.getElementById('user-input').value = '';


    // Scroll to the bottom of chat
    chatBody.scrollTop = chatBody.scrollHeight;

    
    // Simulate bot response
    setTimeout(() => {
        const botMessageContainer = document.createElement('div');
        botMessageContainer.className = 'message-container bot-message-container';

        const botMessageIcon = document.createElement('img');
        botMessageIcon.src = '../assets/gambar/panda.png';
        botMessageIcon.alt = 'Bot Icon';
        botMessageIcon.className = 'message-icon';


        const botMessage = document.createElement('p');
        botMessage.className = 'message bot-message';
        botMessage.textContent = getBotResponse();
        botMessageContainer.appendChild(botMessageIcon);
        botMessageContainer.appendChild(botMessage);

        chatBody.appendChild(botMessageContainer);
        

        // Scroll to the bottom of chat
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

function addBotImage(messageContainer) {
    const botIcon = document.createElement('img');
    botIcon.src = '../gambar/panda.png';
    botIcon.alt = 'Bot Icon';
    botIcon.className = 'message-icon';
    messageContainer.appendChild(botIcon);
  }

function getBotResponse() {
    const responses = [
        "That's funny! 😂",
        /*"I see what you did there! 😜",
        "Tell me more! 🤔",
        "Haha, good one! 😄",
        "You’re hilarious! 🤣"*/
        "I see what you did there! 😜",
        "Tell me more! 🤔",
        "Haha, good one! 😄",
    ];
    return responses[Math.floor(Math.random() * responses.length)];
}

function openNav() {
    document.getElementById("mySidebar").style.left = "0";
    document.querySelector(".main").style.marginLeft = "3px";
    document.querySelector(".chat-container").style.marginLeft = "250px";
}

function closeNav() {
    document.getElementById("mySidebar").style.left = "-250px";
    document.getElementById("mySidebar").style.width = "0";
    document.querySelector(".main").style.marginLeft = "0";
    document.querySelector(".chat-container").style.marginLeft = "0";
}

function logout() {
    // Implement logout functionality here
    console.log("Logged out");
}

function addNewChat() {
    // Implement the functionality to add a new chat
    console.log("New chat added");
    // You can update the UI or make an API call here to create a new chat
}

function deleteChatHistory() {
    // Implement the functionality to delete chat history
    console.log("Chat history deleted");
    // You can update the UI or make an API call here to delete chat history
}

function scrollToChat() {
    document.getElementById("chat-container").scrollIntoView({ behavior: 'smooth' });
}

function addNewChat() {
    // Implement the functionality to add a new chat
    console.log("New chat added");
    // You can update the UI or make an API call here to create a new chat
}

function deleteChatHistory() {
    // Implement the functionality to delete chat history
    console.log("Chat history deleted");
    // You can update the UI or make an API call here to delete chat history
}

function logout() {
    window.location.href = '../index.html'; // Mengarahkan pengguna ke halaman index.html 
}
function login() {
    window.location.href = './login.html'; // Mengarahkan pengguna ke halaman login.html 
}