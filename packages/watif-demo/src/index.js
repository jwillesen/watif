import React from 'react'
import ReactDOM from 'react-dom'
import {Display} from 'watif-browser'
import {DebugAdapter} from 'watif-jailed'
// import * as story from 'watif-example'

// files we need to copy into the dist folder
// explicitly do this here so we don't have to repeat the specific files allowed in the webpack config
// also, this works through symlinks, where webpack include config doesn't
/* eslint-disable import/no-webpack-loader-syntax */
require('./index.html')
require('file-loader?name=[name].[ext]!watif-jailed/dist/watif-bootstrap.js')
require('file-loader?name=[name].[ext]!watif-example/dist/story.js')

const mountPoint = document.getElementById('root')

function loadingError (err) {
  console.error('failed to load story.js', err) // eslint-disable-line no-console
}

const adapter = new DebugAdapter()
fetch('story.js').catch((err) => loadingError(err)).then((result) => {
  result.text().catch((err) => loadingError(err)).then((storyCode) => {
    adapter.loadStory(storyCode, (storyState) => console.log(storyState))
    ReactDOM.render(<Display adapter={adapter} />, mountPoint)
  })
})
