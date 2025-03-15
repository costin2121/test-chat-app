import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
const socket = io("https://test-chat-app-ttp8.onrender.com");

const sendButton = document.querySelector("#send");
const textInput = document.querySelector("#text");
const messages = document.querySelector("#messages");

sendButton.addEventListener('click', () => {
    const text = textInput.value;

    if (!text) return;

    socket.emit("message", text);
})

socket.on('message', message => {
    const el = document.createElement('li');
    el.innerText = message;

    messages.appendChild(el);
})

// socket.on("connect", () => {
//     console.log("Connected to server! Socket ID:", socket.id);
// });

