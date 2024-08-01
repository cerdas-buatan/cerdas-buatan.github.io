const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");
const uploadButton = document.querySelector("#upload-btn");
const fileInput = document.querySelector("#file-input");
const recordButton = document.querySelector("#record-btn");

const Chatinputvalue = document
let userText = null;
const API_KEY = "APIKEY";

const loadDataFromLocalstorage = () => {
    // Load saved chats and theme from local storage and apply/add on the page
    const themeColor = localStorage.getItem("themeColor");

    document.body.classList.toggle("light-mode", themeColor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class="default-text">
                            <h1>Seterah Bot</h1>
                            <p>Selamat Datang di Sehat Sejahtera ChatBot</p>
                        </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText;
    chatContainer.scrollTo(0, chatContainer.scrollHeight); // Scroll to bottom of the chat container
}

const createChatElement = (content, className) => {
    // Create new div and apply chat, specified class and set html content of div
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = content;
    return chatDiv; // Return the created chat div
}

const getChatResponse = async (incomingChatDiv) => {
    if (userText.includes(" ")) {
        // Replace spaces with underscores
        userText = userText.replace(/ /g, "_");
    }
    const API_URL = `key=${userText}`;
    const pElement = document.createElement("p");

    // Define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "login": getCookie("user_login")
        },
    }

    // Send POST request to API, get response and set the reponse as paragraph element text
    try {
        const response = await (await fetch(API_URL, requestOptions)).json();
        // pElement.textContent = response.responses;
        if (response.status == false) {
            pElement.textContent = "Aduh aduh aduhaaai aku ga ngerti nih, coba nanya yang lain biar kamu ngertiin akuu....";
        } else {
            pElement.textContent = response.responses;
        }
    } catch (error) { // Add error class to the paragraph element and set error text
        pElement.classList.add("error");
        pElement.textContent = "Aduh aduh aduhaaai aku ga ngerti nih, coba nanya yang lain biar kamu ngertiin akuu....";
    }

    // Remove the typing animation, append the paragraph element and save the chats to local storage
    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    localStorage.setItem("all-chats", chatContainer.innerHTML);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}

const copyResponse = (copyBtn) => {
    // Copy the text content of the response to the clipboard
    const reponseTextElement = copyBtn.parentElement.querySelector("p");
    navigator.clipboard.writeText(reponseTextElement.textContent);
    copyBtn.textContent = "done";
    setTimeout(() => copyBtn.textContent = "content_copy", 1000);
}

        const showTypingAnimation = () => {
            const html = `
                <div class="chat-content">
                    <div class="chat-details">
                        <img src="../images/setera.png" alt="chatbot-img">
                        <div class="typing-animation">
                            <div class="typing-dot" style="--delay: 0.2s"></div>
                            <div class="typing-dot" style="--delay: 0.3s"></div>
                            <div class="typing-dot" style="--delay: 0.4s"></div>
                        </div>
                    </div>
                    <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                </div>`;
            const incomingChatDiv = createChatElement(html, "incoming");
            chatContainer.appendChild(incomingChatDiv);
            chatContainer.scrollTo(0, chatContainer.scrollHeight);
            getChatResponse(incomingChatDiv);
        };

        function createChatElement(html, type) {
            const div = document.createElement('div');
            div.className = `chat-message ${type}`;
            div.innerHTML = html;
            return div;
        }

        function getChatResponse(incomingChatDiv) {
            // Simulate fetching chat response
            setTimeout(() => {
                incomingChatDiv.innerHTML = `
                    <div class="chat-content">
                        <div class="chat-details">
                            <img src="../images/setera.png" alt="chatbot-img">
                            <p>Here is the response from the bot!</p>
                        </div>
                        <span onclick="copyResponse(this)" class="material-symbols-rounded">content_copy</span>
                    </div>`;
            }, 2000); // Simulate a 2-second delay for the chat response
        }

        function copyResponse(element) {
            // Example copy function
            const text = element.parentElement.querySelector('p').innerText;
            navigator.clipboard.writeText(text).then(() => {
                Swal.fire('Copied!', 'The message has been copied to clipboard.', 'success');
            });
        }
        function sendMessage() {
            const userInput = document.getElementById('user-input').value;
            if (userInput.trim() !== "") {
                showTypingAnimation();
                // Simulate sending message
            }
        }

        function scrollToChat() {
            document.getElementById('chat-container').scrollIntoView({ behavior: 'smooth' });
        }
        
const handleOutgoingChat = () => {
    userText = chatInput.value.trim();
    if (!userText) return; // If chatInput is empty return from here
    // Clear the input field and reset its height
    chatInput.value = "";
    chatInput.style.height = `${initialInputHeight}px`;

    const html = `<div class="chat-content">
                    <div class="chat-details">
                        <img src="../images/user.jpg" alt="user-img">
                        <p>${userText}</p>
                    </div>
                </div>`;

    // Create an outgoing chat div with user's message and append it to chat container
    const outgoingChatDiv = createChatElement(html, "outgoing");
    const defaultTextElement = chatContainer.querySelector(".default-text");
    if (defaultTextElement) {
        defaultTextElement.remove();
    }

    chatContainer.appendChild(outgoingChatDiv);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
    setTimeout(showTypingAnimation, 500);
}


deleteButton.addEventListener("click", () => {
    // Remove the chats from local storage and call loadDataFromLocalstorage function
    if (confirm("Are you sure you want to delete all the chats?")) {
        localStorage.removeItem("all-chats");
        loadDataFromLocalstorage();
    }
});



loadDataFromLocalstorage();
sendButton.addEventListener("click", handleOutgoingChat);