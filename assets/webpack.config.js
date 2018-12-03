'use strict'

const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: process.env.NODE_ENV === 'production' ? 'production': 'development',

	entry: {
		app: './js/app.js'
	},

	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, '../public/assets/js')
	},

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			}
		]
	},

	optimization: {
		minimizer: [
			new UglifyJsPlugin({
				cache: true,
				sourceMap: process.env.NODE_ENV === 'production' ? false : true
			})
		]
	},

	plugins: [
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery',
			'window.jQuery': 'jquery'
		})
	]
};