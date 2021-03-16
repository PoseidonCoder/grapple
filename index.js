const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

let players = {};

io.on('connection', (socket) => {
	Object.keys(players).forEach((id) => {
		socket.emit('newPlayer', {
			pos: players[id],
			id: id,
		});
	});

	socket.on('newPlayer', function (player) {
		players[socket.id] = {
			x: player.x,
			y: player.y,
		};

		socket.broadcast.emit('newPlayer', {
			pos: players[socket.id],
			id: socket.id,
		});
	});

	socket.on('player', function (player) {
		players[socket.id].x = player.x;
		players[socket.id].y = player.y;
		players[socket.id].angle = player.angle;

		socket.broadcast.emit('players', players);
	});
});

app.use(express.static('public'));
http.listen(8080);
