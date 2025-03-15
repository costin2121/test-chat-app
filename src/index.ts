import express from 'express';
import { createServer } from 'http';
import createSocketServer from './socket/createSocketServer';
import path from 'path';

const PORT = process.env.PORT;

const app = express();
const server = createServer(app);

createSocketServer(server);

app.use('/', express.static(path.join(__dirname, '../public')))
<<<<<<< HEAD

=======
import fs from "fs"
for (let f of fs.readdirSync(path.join(__dirname, '../dist'))) 
{
console.log(f)
}
>>>>>>> d36671a7c182e90fd342cc764740eca4592f5648
app.get('/', (req,res) => {
    res.send("Hey! If you see this, it means something has went wrong! Please try again later!")
})


server.listen(PORT, () => {
    console.log(`Listening on http://localhost:${PORT}`);
})