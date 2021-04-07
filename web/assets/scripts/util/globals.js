console.log(`We are ${PRODUCTION ? '' : 'not'} in production`);

const io = require('socket.io-client');

export default {
	socket: io(),
	mapHeight: 1000,
	mapWidth: 2000,
	endpoint: PRODUCTION ? 'http://api.grapply.ga/' : 'http://localhost:8080/',
};
