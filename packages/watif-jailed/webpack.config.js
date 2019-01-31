const path = require('path')

const filesToInclude = [path.resolve(__dirname, 'src'), /@watif/]

const config = {
  mode: 'development',
  entry: './src/bootstrap.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'watif-bootstrap.js',
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
        options: {
          rootMode: 'upward',
        },
      },
    ],
  },
  externals: {
    application: 'application',
  },
  devtool: 'source-map',
}

module.exports = config
