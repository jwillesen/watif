const path = require('path')

const config = {
  mode: 'development',
  entry: './example.js',
  output: {
    library: 'story',
    path: path.resolve(__dirname, 'dist'),
    filename: 'story.js',
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
    'change-case': 'changeCase',
    'react': 'React',
  },

  devtool: 'source-map',
}

module.exports = config
