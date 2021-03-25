const express = require('express');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http);

const redis = require('redis');
const client = redis.createClient();

const { google } = require('googleapis');

if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const oauth = new google.auth.OAuth2(
	'874102344684-vmkrsder30ats2nel9b8dm6v837cchft.apps.googleusercontent.com',
	process.env.CLIENT_SECRET,
	'http://localhost:8080/auth'
);

app.get('/create', (req, res) => {
	const url = oauth.generateAuthUrl({
		scope: 'https://www.googleapis.com/auth/userinfo.email',
	});

	res.redirect(url);
});

app.get('/auth', async (req, res) => {
	const { tokens } = await oauth.getToken(req.query.code);
	oauth.setCredentials(tokens);

	client.hmset(tokens.id_token, {
		name: '',
	});

	res.redirect('/');
});

let players = {};
const frameRate = 30;

io.on('connection', (socket) => {
	socket.on('ready', () => {
		Object.keys(players).forEach((id) => {
			socket.emit('newPlayer', {
				player: players[id],
				id,
			});
		});
	});

	socket.on('newPlayer', (player) => {
		players[socket.id] = {
			x: player.x,
			y: player.y,
			name: player.name,
			score: 0,
		};

		socket.broadcast.emit('newPlayer', {
			player: players[socket.id],
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
			console.log("unable to find player on 'shot'");
		}
	});

	socket.on('disconnect', () => {
		if (players[socket.id]) {
			delete players[socket.id];
			socket.broadcast.emit('playerLeft', socket.id);
		} else {
			console.log("unable to find player on 'disconnect'");
		}
	});
});

setInterval(() => {
	io.emit('players', players);
}, 1000 / frameRate);

setInterval(() => {
	let scoreSorted = Object.keys(players).sort(
		(a, b) => players[b].score - players[a].score
	);

	const leaderboard = scoreSorted.map((player) => {
		const playerInfo = players[player];
		return playerInfo.name + ': ' + playerInfo.score;
	});

	io.emit('leaderboard', leaderboard);
}, 4000);

app.use(express.static('public'));
app.use(require('express-status-monitor')());
http.listen(process.env.PORT || 8080);
