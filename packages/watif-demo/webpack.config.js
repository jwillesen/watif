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
            localIdentName: '[local]__[path][name]__[hash:base64:5]',
            importLoaders: 1,
          },
        }, {
          loader: 'postcss-loader',
        }],
      },
    ],
  },
  externals: {
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    contentBase: path.join((__dirname, 'dist')),
  },
}

module.exports = config
