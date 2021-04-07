const express = require('express');
const cors = require('cors');
const app = express();

const http = require('http').Server(app);
const io = require('socket.io')(http, {
	cors: {
		origin: '*',
		methods: ['GET', 'POST'],
	},
});

const port = 8080;

const redis = require('redis');
const client = redis.createClient(process.env.REDIS_URL);

client.on('error', console.error);

app.use(cors());
app.use(express.json());

let players = {};
const frameRate = 30;

app.post('/api/createUser', (req, res) => {
	console.log('creating user...');
	client.HMSET(
		req.body.id,
		{
			name: '',
		},
		(error) => {
			res.json({
				error,
			});
		}
	);
});

app.post('/api/getName', (req, res) => {
	console.log('getting name...');
	client.HGET(req.body.id, 'name', (error, name) => {
		console.log(name);
		res.json({
			error,
			name,
		});
	});
});

app.post('/api/setName', (req, res) => {
	console.log('setting name...');
	client.HSET(req.body.id, 'name', req.body.name, (error) => {
		res.json({
			error,
		});
	});
});

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

http.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
