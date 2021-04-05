const path = require('path');
const MeasureSpeed = require('speed-measure-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env) => {
	return {
		mode: env.production ? 'production' : 'development',
		entry: {
			main: './assets/scripts/main.js',
		},
		output: {
			path: path.resolve(__dirname, 'assets/dist'),
			filename: '[name].js',
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
		plugins: [new MeasureSpeed()],
	};
};
