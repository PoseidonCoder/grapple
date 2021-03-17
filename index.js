const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

let players = {};
let bullets = [];

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

	socket.on('newBullet', (pos) => {
		const bullet = {
			pos,
			id: socket.id,
		};

		bullets.push(bullet);

		socket.broadcast.emit('newBullet', bullet);
	});

	socket.on('player', function (player) {
		players[socket.id].x = player.x;
		players[socket.id].y = player.y;
		players[socket.id].angle = player.angle;

		socket.broadcast.emit('players', players);
	});

	socket.on('disconnect', () => {
		delete players[socket.id];
		socket.broadcast.emit('playerLeft', socket.id);
	});
});

app.use(express.static('public'));
http.listen(8080);
