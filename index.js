const http = require('http');
const path = require('path');
const express = require('express');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on('connection', (socket)=>{
    console.log("A new user has been connected", socket.id);
    socket.on('chat message', (message)=>{
        console.log("A new user message", message);
        io.emit('chat message', message);
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
})


app.use(express.static(path.resolve('./public')));

app.get('/', (req, res)=>{
    res.sendFile('/public/index.html');
})

server.listen(9000, ()=> console.log(`Server Started at port: 9000`));