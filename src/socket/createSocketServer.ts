import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export default function createSocketServer(server: HttpServer) {
    const io = new Server(server, {
        cors: {
            origin: "https://chat.costindev.xyz", // Change this to frontend URL in production
            methods: ["GET", "POST"]
        }
    });
    
    io.on('connection', (socket) => {
        console.log(`New connection made! Socket ID: ${socket.id.substring(0, 5)}`)

        socket.on('disconnect', () => {
            console.log(`Socket ${socket.id.substring(0, 5)} disconnected`);
        });

        socket.on('message', (message) => {
            io.emit('message', `<span style="color: lightblue">${socket.id.substring(0, 5)}:</span> ${message}`)
        })
    })

    console.log("WebSocket server initialized!");
}
