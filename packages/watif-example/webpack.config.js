const path = require('path')

const config = {
  entry: './src/index.js',
  output: {
    library: 'story',
    libraryTarget: 'commonjs2',
    // libraryTarget: 'umd',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/items'),
        loader: 'babel-loader',
      },
    ],
  },
}

module.exports = config
