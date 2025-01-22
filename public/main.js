const socket = io();

let username = "";

document.getElementById('usernameConfirmBtn').addEventListener("click", () => {
    if ((document.getElementById('username').value) != null) {
        username = document.getElementById('username').value;
        username = username.trim();
        socket.emit('usernameSignup', username);
    }else { alert('Please enter a username'); }
});

socket.on('validUsername', (username) => {
    username = username;
    document.getElementById('usernamePage').style.display = 'none';
    document.getElementById('joinPage').style.display = 'block';
});

socket.on('invalidUsername', (username) => {
    alert(`Username: ${username} is invalid or taken`);    
});


//Behövs detta? 
document.getElementById('createRoomBtn').addEventListener("click", () => {
    document.getElementById('newRoomId').style.display = 'block';
    document.getElementById('confirmCreateRoomBtn').style.display = 'block';
    document.getElementById('roomId').style.display = 'none';
    document.getElementById('joinBtn').style.display = 'none';
    document.getElementById('createRoomBtn').style.display = 'none';
});

//Skapa rum
document.getElementById('confirmCreateRoomBtn').addEventListener("click", () => {
    let roomId = document.getElementById('newRoomId').value;
    if (roomId != null) {
        socket.emit('createRoom', roomId, username);
    } else { alert('Please enter a new room Id'); }
});

//Gå med i rum
document.getElementById('joinBtn').addEventListener("click", () => {
    let roomId = document.getElementById('roomId').value;
    if (roomId != null) {
        socket.emit('joinRoom', roomId, username);
    } else { alert('Please enter a room Id'); }
});

//
socket.on('roomExists', (roomId) => {
    alert('Room already exists');
})

socket.on('roomNotFound', (roomId) => {
    alert("Room doesn't exist");
})

socket.on('moveRoom', (roomId) => {
    window.location.href = 'room.html?roomId=' + roomId;
});

