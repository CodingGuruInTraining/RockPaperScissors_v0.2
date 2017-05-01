var socket = io();

console.log("client sockets reached");

$('.weapons').hide();
$('#messageLog').empty();
var gameNumber = 0;

$('#drawbtn').click(function () {
    $('#drawbtn').fadeOut();
    gameNumber++;
    $('#messageLog').append("<br><div class='msg'>--- Game #" + gameNumber + " ---</div>");
    $('.weapons').fadeIn();
});

$('.weapons').click(function () {
    weaponClick($(this));
    $('.weapons').fadeOut();
});

var username = prompt("Enter your username:");
while (username == "" || username == null) {
    username = prompt("PLEASE enter your username:");
}
socket.emit('setUsername', username);

socket.on('message', function(msgstr) {
    $('#messageLog').append("<div class='msg'>" + msgstr + "</div>");
});

socket.on('outcome', function(datastr) {
    $('#messageLog').append("<div class='msg'>" + datastr + "</div>");
    $('#drawbtn').fadeIn();
});

socket.on('showPlayers', function(countstr) {
    $('#waiting').text(countstr);
    console.log('num players is: ' + countstr);
});

socket.on('wait', function(waitstr) {
    $('#waiting').text(waitstr);
});

function weaponClick(weapon) {
    socket.emit('selectedWeapon', weapon.attr('value'));
}

