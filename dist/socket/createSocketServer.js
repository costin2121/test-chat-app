"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createSocketServer;
const socket_io_1 = require("socket.io");
function createSocketServer(server) {
    const io = new socket_io_1.Server(server, {
        cors: {
            origin: "*", // Change this to frontend URL in production
            methods: ["GET", "POST"]
        }
    });
    io.on('connection', (socket) => {
        console.log(`New connection made! Socket ID: ${socket.id.substring(0, 5)}`);
        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id.substring(0, 5)} disconnected`);
        });
        socket.on('message', (message) => {
            io.emit('message', `${socket.id.substring(0, 5)}: ${message}`);
        });
    });
    console.log("WebSocket server initialized!");
}
