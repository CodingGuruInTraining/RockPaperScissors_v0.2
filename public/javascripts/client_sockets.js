var socket = io();		// may not need if in other js file
// var script = require('client_script');

console.log("client sockets reached");

socket.on('message', function(msgstr) {
    messageEvent(msgstr);
});

socket.on('outcome', function(datastr) {
    outcomeEvent(datastr)
});		// function in other js

function weaponClick(weapon) {
    socket.emit('selectedWeapon', weapon.attr('value'));		// $(this).attr(‘value’)
}

function emitUsername(username) {
    socket.emit('setUsername', username);
}
