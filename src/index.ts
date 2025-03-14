import express from 'express';
import { createServer } from 'http';
import createSocketServer from './socket/createSocketServer';
import path from 'path';

const PORT = process.env.PORT || 3535;

const app = express();
const server = createServer(app);

createSocketServer(server);

app.use('/', express.static(path.join(__dirname, 'public')))
// app.get('/', (req,res) => {res.send("HELLO")})


server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})