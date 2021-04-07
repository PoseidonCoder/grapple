const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

const { DefinePlugin } = require('webpack');

module.exports = merge(common, {
	mode: 'development',
	plugins: [
		new DefinePlugin({
			PRODUCTION: JSON.stringify(false),
		}),
	],
});
