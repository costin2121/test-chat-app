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
    const text = textInput.value;
    if (e.key === "Enter") {
        socket.emit("message", text);
        textInput.value = "";
    }
})

socket.on('message', message => {
    const el = document.createElement('li');
    el.innerHTML = message;

    messages.appendChild(el);
})

socket.on('connect', () => {
    socket.emit("userConnected", socket.id)

})

socket.on('userConnected', (id) => {
    const el = document.createElement('li');
    el.innerHTML = `User ${id} connected!`;
    el.style.color = "orange";
    messages.appendChild(el);
})