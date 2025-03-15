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
        const userId = socket.id.substring(0, 4);

        console.log(`New connection made! Socket ID: ${userId}`)

        socket.on('disconnect', () => {
            console.log(`Socket ${userId} disconnected`);
        });

        socket.on('message', (message) => {
            io.emit('message', `<span style="color: lightblue">${userId}:</span> ${message}`)
        })
    })

    console.log("WebSocket server initialized!");
}
