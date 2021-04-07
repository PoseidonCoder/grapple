const io = require('socket.io-client');
const endpoint = PRODUCTION
	? 'http://api.grapply.ga/'
	: 'http://localhost:8080/';

module.exports = {
	socket: io(endpoint),
	mapHeight: 1000,
	mapWidth: 2000,
	endpoint,
};
