var players = [];
var submits = 0;

var rocks = [];
var papers = [];
var scissors = [];
var lizards = [];
var spocks = [];

function gameStart(io) {
    // var io = require('socket.io').listen(server);		// not sure if need anymore

    io.sockets.on('connection', function (socket) {
        console.log("New connection made.");

        socket.on('setUsername', function (username) {
            console.log('Server: username is: ' + username);
            socket.username = username;
            console.log('Server: socket: ' + socket);
            console.log('Server: socket username: ' + socket.username);
            if (socket.username != "" && socket.username != null) {
                players.push(socket);
                socket.broadcast.emit('message', socket.username + ' has joined the game.');
            }
            else {
                console.log('username: ' + username + ' is no good');
            }
        });

        // socket.broadcast.emit('message', socket.username + ' has joined the game.');

        socket.on('selectedWeapon', function (choice) {
            socket.weapon = choice;
            submits++;

            switch (choice) {
                case "ROCK":
                    rocks.push(socket);		// can it just be the username???
                    break;
                case "PAPER":
                    papers.push(socket);
                    break;
                case "SCISSORS":
                    scissors.push(socket);
                    break;
                case "LIZARD":
                    lizards.push(socket);
                    break;
                case "SPOCK":
                    spocks.push(socket);
                    break;
            }

            if (submits == players.length) {
                // if (rocks.length > 0 && papers.length > 0) {
                //     emitWins(papers, rocks);
                // }
                // if (rocks.length > 0 && scissors.length > 0) {
                //     emitWins(rocks, scissors);
                // }
                // if (papers.length > 0 && scissors.length > 0) {
                //     emitWins(scissors, papers);
                // }

                if (rocks.length > 0 && (scissors.length > 0 || lizards.length > 0)) { emitWins(rocks, scissors, lizards); }
                if (papers.length > 0 && (rocks.length > 0 || spocks.length > 0)) { emitWins(papers, rocks, spocks); }
                if (scissors.length > 0 && (papers.length > 0 || lizards.length > 0)) { emitWins( scissors, papers, lizards); }
                if (lizards.length > 0 && (papers.length > 0 || spocks.length > 0)) { emitWins(lizards, papers, spocks); }
                if (spocks.length > 0 && (rocks.length > 0 || scissors.length > 0)) { emitWins(spocks, rocks, scissors); }
                if (rocks.length > 1) { emitTies(rocks); }
                if (papers.length > 1) { emitTies(papers); }
                if (scissors.length > 1) { emitTies(scissors); }
                if (lizards.length > 1) { emitTies(lizards); }
                if (spocks.length > 1) { emitTies(spocks); }

                submits = 0;
                rocks.length = 0;
                papers.length = 0;
                scissors.length = 0;
                lizards.length = 0;
                spocks.length = 0;
            }
        });
    });
}
	function emitWins(winners, losers, losers2) {
		for (var x = 0; x < winners.length; x++) {
			if (losers.length > 0) {
                for (var y = 0; y < losers.length; y++) {
                    io.sockets.emit('outcome', winners[x].username + " beats " + losers[y].username);
                    break;
                }
            }
            if (losers2.length > 0) {
                for (var z = 0; z < losers2.length; z++) {
                    io.sockets.emit('outcome', winners[x].username + " beats " + losers[z].username);
                    break;
                }
            }
		}
	}

	function emitTies(tiers) {
		var tiersStr = tiers[0].username;
		for (var x = 1; x < (tiers.length - 1); x++) {
			tiersStr += ", " + tiers[x].username;
		}
		tiersStr += " and " + tiers[(tiers.length - 1)].username;
		io.sockets.emit('outcome', tiersStr + " tied with " + tiers[0].weapon);
	}

	module.exports = gameStart;
