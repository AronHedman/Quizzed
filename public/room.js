const params = new URLSearchParams(window.location.search);
const roomId = params.get('roomId');

const socket = io();

const users = {};

socket.on('newUserJoined', (socket, username) => {
    users[socketId] = username;
    const userList = document.getElementById('userList');
    const listItem = document.createElement('li');
    listItem.textContent = username;
    userList.appendChild(listItem);
    console.log(users);
})

    