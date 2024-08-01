// function getcookie(name){
//     let cookieArr = document.cookie.split(";");
//     for(let i=0; i< cookieArr.length; i++){
//         let cookiePair = cookieArr[i].split("=");
//         if(name == cookiePair[0].trim()){
//             return decodeURIComponent(cookiePair[1]);
//         }
//     }
//     return null;
// }

// Function to toggle button visibility based on login status
// Function to toggle button visibility based on login status
function checkLoginStatus() {
    const userLogin = getCookie("user_login");
    const loginButton = document.querySelector(".sidebar-buttons .sidebar-btn");
    const logoutButton = document.querySelector("#logoutButton");
    const profilePicture = document.querySelector("#profile-picture");

    if (userLogin) {
        loginButton.style.display = "none";
        logoutButton.style.display = "block";
        profilePicture.style.display = "block";
        profilePicture.src = localStorage.getItem('profilePicture'); // Set profile picture from localStorage
    } else {
        loginButton.style.display = "block";
        logoutButton.style.display = "none";
        profilePicture.style.display = "none";
        profilePicture.src = ""; // Clear profile picture
    }
}

// DOMContentLoaded event to set welcome message and check login status
document.addEventListener('DOMContentLoaded', () => {
    const username = localStorage.getItem('username');
    if (username) {
        const defaultTextContainer = document.querySelector('.default-text');
        defaultTextContainer.innerHTML = `<h1>Selamat Datang, ${username}</h1>`;
    }
    checkLoginStatus();
});

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
    userMessageContainer.appendChild(userMessage); // Append user message to container
    chatBody.appendChild(userMessageContainer); // Append container to chat body

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

document.getElementById("send-btn").addEventListener("click", sendMessage);

function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (message) {
        addMessageToChat("outgoing", message);
        input.value = "";
        document.getElementById("send-btn").style.display = "none";
        document.querySelector(".chat-logo").style.display = "none";

        setTimeout(() => {
            addMessageToChat("incoming", getBotResponse());
            document.getElementById("send-btn").style.display = "block";
            document.querySelector(".chat-logo").style.display = "block";
        }, 1000); // Simulate a delay for bot response
    }
}

function addMessageToChat(type, message) {
    const chatContainer = document.querySelector(".chat-body");
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("message-container", type === "outgoing" ? "user-message-container" : "bot-message-container");

    const messageParagraph = document.createElement("p");
    messageParagraph.classList.add(type === "outgoing" ? "user-message" : "bot-message");
    messageParagraph.textContent = message;

    if (type === "incoming") {
        const botMessageIcon = document.createElement('img');
        botMessageIcon.src = '../assets/gambar/panda.png';
        botMessageIcon.alt = 'Bot Icon';
        botMessageIcon.className = 'message-icon';
        chatDiv.appendChild(botMessageIcon);
    }

    chatDiv.appendChild(messageParagraph);
    chatContainer.appendChild(chatDiv);
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

// function getBotResponse() {
//     const responses = [
//         "That's funny! 😂",
//         "I see what you did there! 😜",
//         "Tell me more! 🤔",
//         "Haha, good one! 😄",
//     ];
//     return responses[Math.floor(Math.random() * responses.length)];
// }

function toggleSidebar() {
    const sidebar = document.getElementById("mySidebar");
    const main = document.querySelector(".main");
    const chatContainer = document.querySelector(".chat-container");

    if (sidebar.style.left === "0px" || sidebar.style.left === "") {
        // Jika sidebar terbuka atau posisi default
        sidebar.style.left = "-250px";
        main.style.marginLeft = "0";
        chatContainer.style.marginLeft = "0";
    } else {
        // Jika sidebar tertutup
        sidebar.style.left = "0";
        main.style.marginLeft = "250px";
        chatContainer.style.marginLeft = "250px";
    }
}


function logout() {
    Swal.fire({
        title: 'Kamu yakin mau logout?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        customClass: {
            confirmButton: 'btn-confirm',
            cancelButton: 'btn-cancel'
        },
        buttonsStyling: false 
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '../index.html'; 
        }
    });
}

function toggleOptionsMenu() {
    document.getElementById("optionsMenu").classList.toggle("show");
}


function toggleOptionsMenu() {
    const optionsMenu = document.getElementById("optionsMenu");
    if (optionsMenu.style.display === "block") {
        optionsMenu.style.display = "none";
    } else {
        optionsMenu.style.display = "block";
        setTimeout(() => {
            optionsMenu.style.display = "none";
        }, 3000); // 3000 ms = 3 seconds
    }
}

document.addEventListener('click', function(event) {
    const optionsMenu = document.getElementById("optionsMenu");
    const isClickInside = optionsMenu.contains(event.target) || event.target.matches('.popup-menu');

    if (!isClickInside) {
        optionsMenu.style.display = "none";
    }
});

function renameMenu() {
    const newName = prompt("Enter new menu name:");
    if (newName) {
        // Perform the rename operation
        alert("Menu renamed to: " + newName);
    }
}

function deleteMenu() {
    if (confirm("Are you sure you want to delete this menu?")) {
        // Perform the delete operation
        alert("Menu deleted");
    }
}

function archiveMenu() {
    if (confirm("Are you sure you want to move this menu to archive?")) {
        // Perform the archive operation
        alert("Menu moved to archive");
    }
}

function addMenu() {
    const menuName = prompt("Enter new menu name:");
    if (menuName) {
        // Perform the add menu operation
        alert("New menu added: " + menuName);
    }
}




