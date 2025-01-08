const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const users = {}; //Kopplar Username till Socket.Id
const rooms = {}; //Används till debug och att spåra användare+rum.


io.on('connection', (socket) => {
    console.log('A user connected');

    //Username
    socket.on('usernameSignup', (username) => {
        if (!users[socket.id] && !Object.values(users).includes(username)) {
            users[socket.id] = username;
            socket.emit('validUsername', username);
        }else{
            socket.emit('invalidUsername', username);
        }
    });

    //Create room
    socket.on('createRoom', (roomId) => {
        if (!rooms[roomId]) {
           rooms[roomId];
            socket.join(roomId);
            console.log(`Room created: ${roomId}`);
            socket.emit('roomJoined', roomId);
        } else {
            socket.emit('roomExists', roomId);
        }
    });

    //Join room
    socket.on('joinRoom', (roomId, username) => {
        if (rooms[roomId]) {
            socket.join(roomId);
            console.log(`User joined room: ${roomId}`);
        } else {
            socket.emit('roomNotFound', roomId);
        }
    });






    socket.on('disconnect', () => {
        console.log('A user disconnected'); //Kanske funkar, visar disconnect när man byter rum.
    });
});

//Till debuggern, skickar rummen
app.get('/rooms', (req, res) => {
    console.log(rooms);
    res.json(rooms);
});


//server-port
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//IP-adress, tillfällig, inte färdig
var os = require('os');
var networkInterfaces = os.networkInterfaces();
console.log(networkInterfaces);