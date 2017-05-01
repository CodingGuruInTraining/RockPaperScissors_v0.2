var socket = io();		// may not need if in other js file
// var script = require('client_script');

console.log("client sockets reached");



$('.weapons').hide();
$('#messageLog').empty();
var gameNumber = 0;

$('#drawbtn').click(function () {
    $('#drawbtn').fadeOut();
    gameNumber++;
    $('#messageLog').append("<br><div class='msg'>--- Game #" + gameNumber + " ---</div>");
    var flashers = ["ROCK", "PAPER", "SCISSORS", "LIZARD", "SPOCK"];
    for (var x = 0; x < flashers.length; x++) {
        setTimeout(function () {
            $('#countdown').text = flashers[x];
        }, 750);
    }
    $('.weapons').fadeIn();
});

$('.weapons').click(function () {
    weaponClick($(this));		// function in other js
    $('.weapons').fadeOut();
});

var username = prompt("Enter your username:");
while (username == "" || username == null) {
    username = prompt("PLEASE enter your username:");
}
// console.log('username is: ' + username);
socket.emit('setUsername', username);




// var msgLog = document.getElementById('#messageLog');
// var drawButton = document.getElementById('#drawbtn');
// var weapons = document.getElementsByClassName('.weapons');
// var countdownDiv = document.getElementById('#countdown');
//
// weapons.style.visibility = "hidden";
// msgLog.empty();
// var gameNumber = 0;
// var flashers = ["ROCK", "PAPER", "SCISSORS", "LIZARD", "SPOCK"];
//
// drawButton.addEventListener('click', function(){
//     drawButton.fadeOut();
//     gameNumber++;
//     msgLog.appendChild("<br><div class='msg'>--- Game #" + gameNumber + " ---</div>");
//     for (var x = 0; x < flashers.length; x++) {
//         setTimeout(function () {
//             countdownDiv.innerHTML = flashers[x];
//         }, 750);
//     }
//     weapons.fadeIn();
// });
//
// weapons.addEventListener('click', function() {
//     socket.emit('selectedWeapon', weapon.attr('value'));
//     weapons.fadeOut();
// });

socket.on('message', function(msgstr) {
    $('#messageLog').append("<div class='msg'>" + msgstr + "</div>");
    // messageEvent(msgstr);
});

socket.on('outcome', function(datastr) {
    $('#messageLog').append("<div class='msg'>" + datastr + "</div>");
    $('#drawbtn').fadeIn();

    // outcomeEvent(datastr)
});		// function in other js


function weaponClick(weapon) {
    socket.emit('selectedWeapon', weapon.attr('value'));		// $(this).attr(‘value’)
}

// function emitUsername(username) {
//     socket.emit('setUsername', username);
// }
