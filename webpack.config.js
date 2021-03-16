const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
		app: './js/app.js'
	},
	mode: 'development',
  output: {
    filename: '[name].[contentHash].js',
    path: path.resolve(__dirname, 'dist'),
  },
	devtool: 'source-map',
	plugins: [new HtmlWebpackPlugin({
		template: path.resolve(__dirname, 'index.html')
	})]
};