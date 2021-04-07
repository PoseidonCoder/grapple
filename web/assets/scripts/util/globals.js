const io = require('socket.io-client');
const endpoint = PRODUCTION
	? 'http://api.grapply.ga/'
	: 'http://localhost:8080/';

export default {
	socket: io(endpoint),
	mapHeight: 1000,
	mapWidth: 2000,
	endpoint,
};
