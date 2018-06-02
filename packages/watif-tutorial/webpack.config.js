const path = require('path')

const filesToInclude = [
  path.resolve(__dirname, 'src'),
  /@watif/,
]

const config = {
  mode: 'development',
  entry: './example.js',
  output: {
    library: 'story',
    path: path.resolve(__dirname, 'dist'),
    filename: 'story.js',
  },

  resolve: {
    symlinks: false,
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: filesToInclude,
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
