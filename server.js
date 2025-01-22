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
const rooms = {}; //Används till debug och att spåra användarnamn+rum.


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
    socket.on('createRoom', (roomId, username) => {
        if (!rooms[roomId]) {
           rooms[roomId] = [];
            console.log(`Room created: ${roomId}`);
            socket.join(roomId);
            rooms[roomId].push(username);
            console.log(`User: ${username} joined room: ${roomId}`);
            socket.emit('moveRoom', roomId);
        } else {
            socket.emit('roomExists', roomId);
        }
    });

    //Join room
    socket.on('joinRoom', (roomId, username) => {
        if (rooms[roomId]) {
            socket.join(roomId);
            rooms[roomId].push(username);
            console.log(`User: ${username} joined room: ${roomId}`);
            socket.emit('moveRoom', roomId);
        } else {
            socket.emit('roomNotFound', roomId);
        }
    });

    //Debugger
    socket.on('moveRoom', (roomId) => {
        socket.emit('roomsUpdated');
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected'); //Kanske funkar, visar disconnect när man byter rum.
    });
});


//Debugger, kanske kan stanna kvar
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

//Till debuggern, skickar rummen
app.get('/rooms', (req, res) => {
    res.json(rooms);
    console.log(rooms);
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