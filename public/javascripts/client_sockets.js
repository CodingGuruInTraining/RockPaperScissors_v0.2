// var socket = io();		// may not need if in other js file

console.log("client sockets reached");

socket.on('message', messageEvent(msgstr));

socket.on('outcome', outcomeEvent(datastr));		// function in other js

function weaponClick(weapon) {
    socket.emit('selectedWeapon', weapon.attr('value'));		// $(this).attr(‘value’)
}

function emitUsername(username) {
    socket.emit('setUsername', username);
}
