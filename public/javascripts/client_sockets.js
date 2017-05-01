var socket = io();

console.log("client sockets reached");


$('#countdown').hide();


$('.weapons').hide();
$('#messageLog').empty();
var gameNumber = 0;

$('#drawbtn').click(function () {
    $('#drawbtn').fadeOut();
    gameNumber++;
    $('#messageLog').append("<br><div class='msg'>--- Game #" + gameNumber + " ---</div>");
    var flashers = ["ROCK", "PAPER", "SCISSORS", "LIZARD", "SPOCK"];
console.log('number of array items: ' + flashers.length);
console.log($('#countdown').innerHTML);
    console.log($('#countdown').String);
    console.log($('#countdown').text());
    // console.log($('#countdown').val());
    // console.log($('#countdown').valueOf());
    // console.log($('#countdown').value);



//     for (var x = 0; x < flashers.length; x++) {
// console.log(flashers[x]);
//         setTimeout(function() {
//             console.log('im in a function');
//             $('#countdown').val('update' + x);
//             // $('.countdown').html(flashers[x]);
//         }, 3750);
//     }


    for ($('p') in $('#countdown')) {
        $(this).fadeIn('fast');
    }


    $('.weapons').fadeIn();

    // $('#countdown').hide();

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
