const path = require('path')

const config = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    library: 'watif-browser-display',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist'),
    filename: 'watif-browser-display.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      }, {
        test: /\.css$/,
        include: path.resolve(__dirname, 'src'),
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
          options: {
            modules: true,
            localIdentName: '[path]__[name]__[local]__[hash:base64:5]',
          },
        }],
      },
    ],
  },

  externals: {
    'react': 'React',
  },

  devtool: 'cheap-module-source-map',
}

module.exports = config
