import React from 'react'
import './style.css'

export default class Log extends React.Component {
  render () {
    return <div styleName="root">
      <h2 styleName="header">Log</h2>
      <div styleName="content">
        This is the log!
      </div>
    </div>
  }
}
