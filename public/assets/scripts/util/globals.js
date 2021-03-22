const io = require('socket.io-client');

export default {
	socket: io(),
	mapHeight: 1000,
	mapWidth: 2000,
};
