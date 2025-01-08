const socket = io();

const username = "";

document.getElementById('usernameConfirmBtn').addEventListener("click", () => {
    if ((document.getElementById('username').value) != null) {
        socket.emit('usernameSignup', document.getElementById('username').value);
    }else { alert('Please enter a username'); }
});

socket.on('validUsername', (username) => {
    username = username;
    document.getElementById('usernamePage').style.display = 'none';
    document.getElementById('joinPage').style.display = 'block';
});

socket.on('invalidUsername', (username) => {
    alert(`Username: ${username} is invalid`);    
});

document.getElementById('createRoomBtn').addEventListener("click", () => {
    document.getElementById('newRoomId').style.display = 'block';
    document.getElementById('confirmCreateRoomBtn').style.display = 'block';
});

//Skapa rum
document.getElementById('confirmCreateRoomBtn').addEventListener("click", () => {
    let roomId = document.getElementById('newRoomId').value;
    if (username != null && (roomId) != null) {
        username = document.getElementById('username').value;
        socket.emit('createRoom', roomId, username);
    } else { alert('Please enter a username and room Id'); }
});

//Gå med i rum
document.getElementById('joinBtn').addEventListener("click", () => {
    let roomId = document.getElementById('room-id').value;
    if ((document.getElementById('username').value) != null && (document.getElementById('room-id').value) != null) {
        socket.emit('joinRoom', roomId, document.getElementById('username').value);
        window.location.href = 'room.html?roomId=' + roomId;
    } else { alert('Please enter a username and room Id'); }
});

//Confirm room join?
socket.on('roomJoined', (roomId) => {
    window.location.href = 'room.html?roomId=' + roomId;
    socket.emit('joinRoom', roomId);
})

//
socket.on('roomExists', (roomId) => {
    alert('Room already exists');
})

socket.on('roomNotFound', (roomId) => {
    alert('Room does not exist');
})



