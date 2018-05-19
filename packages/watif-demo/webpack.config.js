const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

const conditionalPlugins = []
if (process.env.ANALYZE) conditionalPlugins.push(new BundleAnalyzerPlugin())

const config = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'watif-demo.js',
  },
  resolve: {
    alias: {
      react: path.resolve(__dirname, 'node_modules', 'react'),
      'change-case': path.resolve(__dirname, 'node_modules', 'change-case'),
    },
  },
  plugins: [
    ...conditionalPlugins,
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'babel-loader',
      }, {
        test: /\.html$/,
        include: path.resolve('./src'),
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
        },
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
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.join((__dirname, 'dist')),
  },
}

module.exports = config
