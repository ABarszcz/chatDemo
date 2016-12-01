//define socket.io
var socket = io();

//this function runs when the send button is clicked.
function sendFunction() {
    socket.emit('new message', $('#new-message').val()); //emits a message caught by app.js
    $('#new-message').val('');
}

//listens for 'chat message' in socket.io
socket.on('chat message', function(msg) {
    $('#messages-area').append($('<li>').text(msg));
});

//listens for 'conn' in socket.io and appends a 'user connected' message when it is heard
socket.on('conn', function() {
    $('#messages-area').append($('<li>').text('a user connected'));
});

//listens for 'disconn' in socket.io and appends 'a user disconnected' message when it is heard
socket.on('disconn', function() {
    $('#messages-area').append($('<li>').text('a user disconnected'));
});

/* Show when a user is typing */

var typing = false;
var timeout = undefined;

//function that runs when the timeout occurs
function timeoutFunction() {
    typing = false;
    socket.emit('no longer typing');
}

//function that runs when a key is pressed
function onKeyDownNotEnter() {
    if(typing == false) {
        typing = true
        //sends that the user is typing
        socket.emit('typing');
        //after a certain amount of time, run the timeout function
        timeout = setTimeout(timeoutFunction, 5000);
    //runs if the user is still typing
    } else {
        clearTimeout(timeout);
        timeout = setTimeout(timeoutFunction, 5000);
    }
}

//listens for the typing message
socket.on('typing', function() {
    //TODO make a label that says typing visible?
});

//listens for the no longer typing message
socket.on('no longer typing', function() {
    //TODO hide the label that says typing?
});