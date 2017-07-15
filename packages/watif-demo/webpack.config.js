const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'watif-demo.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Watif Demo',
    }),
  ],
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
  },
  devtool: 'cheap-module-source-map',
  devServer: {
    contentBase: [
      path.join((__dirname, 'dist')),
      path.join((__dirname, 'node_modules/watif-example/dist')),
      path.join((__dirname, 'node_modules/watif-jailed/dist')),
    ],
  },
}

module.exports = config
