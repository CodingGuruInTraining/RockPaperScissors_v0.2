// Array to hold all socket objects.
var players = [];
// Counter for number of players that have
// selected a weapon. This is used to determine
// when all players have played.
var submits = 0;

// Empty arrays to hold sockets based on their choice.
var rocks = [];
var papers = [];
var scissors = [];
var lizards = [];
var spocks = [];

// Global variable to hold server in order to use in functions.
var my_io;

function gameStart(io) {
    my_io = io;
    // Connects websockets.
    io.sockets.on('connection', function (socket) {
        console.log("New connection made.");

        // Sets the socket's username attribute and informs the
        // current players that someone has joined.
        socket.on('setUsername', function (username) {
            socket.username = username;
            if (socket.username != "" && socket.username != null) {
                players.push(socket);
                socket.broadcast.emit('message', socket.username + ' has joined the game.');
            }
            // Updates player counter on client.
            showPlayers();
        });

        // Main comparison method.
        socket.on('selectedWeapon', function (choice) {
            // Sets the socket's weapon attribute.
            socket.weapon = choice;
            console.log('Server: socket weap: ' + socket.weapon);
            // Increases the submits counter.
            submits++;
            console.log('Server submits: ' + submits);
            console.log('Server players: ' + players.length);
            // Determines what choice is present and adds that
            // socket to its respective array.
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
            // Checks if all players have sent in their weapon choice.
            if (submits === players.length) {
                // Checks if certain arrays contain items and emits messages
                // based on the results.
                if (rocks.length > 0 && (scissors.length > 0 || lizards.length > 0)) { emitWins(rocks, scissors, lizards); }
                if (papers.length > 0 && (rocks.length > 0 || spocks.length > 0)) { emitWins(papers, rocks, spocks); }
                if (scissors.length > 0 && (papers.length > 0 || lizards.length > 0)) { emitWins( scissors, papers, lizards); }
                if (lizards.length > 0 && (papers.length > 0 || spocks.length > 0)) { emitWins(lizards, papers, spocks); }
                if (spocks.length > 0 && (rocks.length > 0 || scissors.length > 0)) { emitWins(spocks, rocks, scissors); }

                // Checks which arrays have 2+ items meaning those sockets
                // tied with each other.
                if (rocks.length > 1) { emitTies(rocks); }
                if (papers.length > 1) { emitTies(papers); }
                if (scissors.length > 1) { emitTies(scissors); }
                if (lizards.length > 1) { emitTies(lizards); }
                if (spocks.length > 1) { emitTies(spocks); }

                // Clears objects.
                submits = 0;
                rocks.length = 0;
                papers.length = 0;
                scissors.length = 0;
                lizards.length = 0;
                spocks.length = 0;
            }
            else {
                // Updates player counter message on client.
                waiting();
            }
        });

        // Removes socket from array.
        socket.on('disconnect', function(){
            var spot = players.indexOf(socket);
            players.splice(spot, 1);
            showPlayers();
        })
    });
}
	function emitWins(winners, losers, losers2) {
        // Loops through the provided arrays and emits messages of who won.
        // Since each weapon can beat 2 other weapon types, both are looped through
        // if there are items in their arrays.
		for (var x = 0; x < winners.length; x++) {
			if (losers.length > 0) {
                for (var y = 0; y < losers.length; y++) {
                    my_io.sockets.emit('outcome', winners[x].username + " beats " + losers[y].username);
                    break;
                }
            }
            if (losers2.length > 0) {
                for (var z = 0; z < losers2.length; z++) {
                    my_io.sockets.emit('outcome', winners[x].username + " beats " + losers2[z].username);
                    break;
                }
            }
		}
	}

	function emitTies(tiers) {
        // Loops through array and emits message of who tied.
		var tiersStr = tiers[0].username;
		for (var x = 1; x < (tiers.length - 1); x++) {
			tiersStr += ", " + tiers[x].username;
		}
		tiersStr += " and " + tiers[(tiers.length - 1)].username;
		my_io.sockets.emit('outcome', tiersStr + " tied with " + tiers[0].weapon);
	}

	function showPlayers() {
        // Emits message of number of active players.
        my_io.sockets.emit('showPlayers', players.length + ' Active Players')
    }

    function waiting() {
        // Emits message of number of players still to submit their choice.
        var remaining = players.length - submits;
        my_io.sockets.emit('wait', 'Players waiting on: ' + remaining)
    }

	module.exports = gameStart;
