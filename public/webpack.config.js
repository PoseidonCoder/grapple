const path = require('path');

module.exports = {
	mode: "production",
	entry: './assets/scripts/main.js',
	output: {
		path: path.resolve(__dirname, 'assets/dist'),
		filename: 'main.js',
	},
};
