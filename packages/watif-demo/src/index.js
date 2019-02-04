import React from 'react'
import ReactDOM from 'react-dom'
import {DebugAdapter} from '@watif/jailed'
import App from './app'

// files we need to copy into the dist folder
// explicitly do this here so we don't have to repeat the specific files allowed in the webpack config
// also, this works through symlinks, where webpack include config doesn't
/* eslint-disable import/no-webpack-loader-syntax */
/* eslint-disable import/no-unresolved */
require('./index.html')
require('file-loader?name=[name].[ext]!@watif/jailed/dist/watif-bootstrap.js')
require('file-loader?name=[name].[ext]!@watif/tutorial/dist/story.js')
require('file-loader?name=[name].[ext]!normalize.css/normalize.css')

const mountPoint = document.getElementById('root')

const adapter = new DebugAdapter()
ReactDOM.render(<App adapter={adapter} />, mountPoint)
