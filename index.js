const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

let players = {};

io.on('connection', (socket) => {
	socket.on('ready', () => {
		Object.keys(players).forEach((id) => {
			socket.emit('newPlayer', {
				pos: players[id],
				id: id,
			});
		});
	});

	socket.on('newPlayer', function (player) {
		players[socket.id] = {
			x: player.x,
			y: player.y,
			score: 0,
		};

		socket.broadcast.emit('newPlayer', {
			pos: players[socket.id],
			id: socket.id,
		});
	});

	socket.on('newBullet', (pos) => {
		socket.broadcast.emit('newBullet', {
			pos,
			id: socket.id,
		});
	});

	socket.on('player', (player) => {
		if (players[socket.id]) {
			players[socket.id].x = player.x;
			players[socket.id].y = player.y;
			players[socket.id].angle = player.angle;
		} else {
			console.log(`unable to find player ID ${socket.id} on 'player'`);
		}
	});

	socket.on('shot', (id) => {
		if (id === socket.id) return;

		if (players[socket.id] && players[id]) {
			players[socket.id].score--;
			players[id].score++;
		} else {
			console.log("unable to find player on 'shot'")
		}
	});

	socket.on('disconnect', () => {
		if (players[socket.id]) {
			delete players[socket.id];
			socket.broadcast.emit('playerLeft', socket.id);
		} else {
			console.log("unable to find player on 'disconnect'")
		}
	});
});

setInterval(() => {
	io.emit('players', players);
}, 1000 / 24);

app.use(express.static('public'));
http.listen(8080);
