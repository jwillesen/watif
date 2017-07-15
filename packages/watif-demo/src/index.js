import React from 'react'
import ReactDOM from 'react-dom'
import {Display} from 'watif-browser'
import {DebugAdapter} from 'watif-jailed'
// import * as story from 'watif-example'

const mountPoint = document.createElement('div')
document.body.appendChild(mountPoint)

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
