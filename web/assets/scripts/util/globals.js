const io = require('socket.io-client');

module.exports = {
	socket: io(
		PRODUCTION ? 'http://socket.api.grapply.ga/' : 'http://localhost:7070/'
	),
	mapHeight: 1000,
	mapWidth: 2000,
	endpoint: PRODUCTION ? 'http://api.grapply.ga/' : 'http://localhost:8080/',
};
