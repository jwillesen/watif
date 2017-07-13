const path = require('path')

const config = {
  entry: './src/bootstrap.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'watif-bootstrap.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      },
    ],
  },
  externals: {
    'application': 'application',
  },
  devtool: 'cheap-module-source-map',
}

module.exports = config
