import React from 'react'
import ReactDOM from 'react-dom'
import {Display} from 'watif-browser'
import {DebugAdapter} from 'watif-jailed'
// import * as story from 'watif-example'

const mountPoint = document.createElement('div')
document.body.appendChild(mountPoint)

const adapter = new DebugAdapter()
// adapter.loadStory(story)
ReactDOM.render(<Display adapter={adapter} />, mountPoint)
