const path = require('path');
const MeasureSpeed = require('speed-measure-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	mode: 'development',
	cache: true,
	entry: {
		main: './assets/scripts/main.js'
	},
	output: {
		path: path.resolve(__dirname, 'assets/dist'),
		filename: 'main.js',
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: true,
				cache: true,
			}),
		],
	},
	experiments: {
		topLevelAwait: true,
	},
	plugins: [new MeasureSpeed()],
};
