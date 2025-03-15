import { io } from "https://cdn.socket.io/4.8.1/socket.io.esm.min.js";
const socket = io("https://chat.costindev.xyz");

const sendButton = document.querySelector("#send");
const textInput = document.querySelector("#text");
const messages = document.querySelector("#messages");

let colors = ["lightblue", "red", "green", "lightgreen", "cyan", "purple", "violet", "indigo"];
let socketIdColors = {};

function sendMessageEvent(text) {
    socket.emit("message", text);
    textInput.value = "";
    messages.scrollTop = messages.scrollHeight;
}

sendButton.addEventListener('click', () => {
    const text = textInput.value;

    if (!text) return;
    sendMessageEvent(text);
})

document.addEventListener('keyup', (e) => {
    const text = textInput.value;
    if (e.key === "Enter") {
        sendMessageEvent(text);
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

function coloredText(text, color) {
    return `<span style="color: ${color}">${text}</span>`
}

socket.on('userConnected', (id) => {
    const el = document.createElement('li');
    el.innerHTML = `${coloredText("User", "orange")} ${coloredText(id, socketIdColors[id])} ${coloredText("connected!", "orange")}`;
    messages.appendChild(el);
})
