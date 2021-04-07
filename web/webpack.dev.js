const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const path = require('path');
const { DefinePlugin } = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	devServer: {
		contentBase: path.join(__dirname, 'assets/dist'),
		compress: true,
		port: 8000,
	},
	plugins: [
		new DefinePlugin({
			PRODUCTION: JSON.stringify(false),
		}),
	],
});
