const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const loaders = [
  {
    test: /\.m?js$/,
    exclude: [/node_modules/, /loader.js/],
    use: ['babel-loader'],
  },
  {
    test: /\.css$/i,
    use: ['style-loader', 'css-loader'],
  },
];

module.exports = {
  entry: {
    app: './src/index.js',
    wasmLoader: './src/loader.js',
  },
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  devtool: 'source-map',
  module: {
    rules: loaders,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'index.html'),
    }),
  ],
};
