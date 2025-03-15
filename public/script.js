import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
const socket = io("https://chat.costindev.xyz");

const sendButton = document.querySelector("#send");
const textInput = document.querySelector("#text");
const messages = document.querySelector("#messages");

sendButton.addEventListener('click', () => {
    const text = textInput.value;

    if (!text) return;

    socket.emit("message", text);
    textInput.value = "";
})

document.addEventListener('keyup', (e) => {
    if (e.key === "Enter") {
        socket.emit("message", text);
        textInput.value = "";
    }
})

socket.on('message', message => {
    const el = document.createElement('li');
    el.innerText = message;

    messages.appendChild(el);
})

socket.on('connect', () => {
    const el = document.createElement('li');
    el.innerHTML = `User ${socket.id.substring(0, 4)} Connected!`;
    el.style.color = "orange";

    messages.appendChild(el);
})