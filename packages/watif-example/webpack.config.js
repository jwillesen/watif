const path = require('path')

// with this config, this works in node (interpreter should be able to do something similar)
// const fs = require('fs')

// const changeCase = require('change-case')
// const React = require('react')

// function loadStory () {
//   eval(
//     fs.readFileSync('dist/story.js', {encoding: 'utf-8'})
//   )
//   return story
// }

const config = {
  entry: './index.js',
  output: {
    library: 'story',
    path: path.resolve(__dirname, 'dist'),
    filename: 'story.js',
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
  externals: {
    'change-case': 'changeCase',
    'react': 'React',
  },
}

module.exports = config
