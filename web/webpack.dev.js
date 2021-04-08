const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');
const { DefinePlugin } = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		contentBase: 'assets',
		compress: true,
		open: true,
		port: 8000,
	},
	output: {
		path: path.resolve(__dirname, 'assets/dist'),
		filename: '[name].bundle.js',
		clean: true,
	},
	plugins: [
		new DefinePlugin({
			PRODUCTION: JSON.stringify(false),
		}),
	],
});
