const path = require('path');
const MeasureSpeed = require('speed-measure-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
	entry: {
		main: './assets/scripts/main.js',
	},
	plugins: [new MeasureSpeed()],
	output: {
		path: path.resolve(__dirname, 'assets/dist'),
		filename: '[name].bundle.js',
		clean: true,
	},
	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				parallel: true,
				cache: true,
			}),
		],
		runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	experiments: {
		topLevelAwait: true,
	},
};
