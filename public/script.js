import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
const socket = io("https://chat.costindev.xyz");

const sendButton = document.querySelector("#send");
const textInput = document.querySelector("#text");
const messages = document.querySelector("#messages");

let colors = ["lightblue", "red", "green", "lightgreen", "cyan", "magenta"]
let socketIdColors = {};

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
    const id = socket.id.substring(0, 4);
    const color = colors[Math.floor(Math.random() * colors.length)];
    socketIdColors[id] = color;
    colors = colors.filter(c => c != color);

    socket.emit("userConnected", { id: socket.id, color: color })

})

socket.on('userConnected', (id) => {
    const el = document.createElement('li');
    el.innerHTML = `User <span style="color: ${socketIdColors[id]}>${id}</span> connected!`;
    el.style.color = "orange";
    messages.appendChild(el);
})