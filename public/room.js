const params = new URLSearchParams(window.location.search);
const roomId = params.get('roomId');

const socket = io();

const users = {};

socket.on('newUserJoined', (socket, username) => {
    Object.assign(users, {socket, username});
    document.getElementById('userList').createElement('li').textContent = username;
    console.log(users)
})

