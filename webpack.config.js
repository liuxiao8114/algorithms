const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.bundle.js',
    path: path.resolve(__dirname, 'public')
  },
  devtool: 'source-map',
  devServer: {
    contentBase: './public',
    hot: true,
    port: 9000
  },
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  }
}
