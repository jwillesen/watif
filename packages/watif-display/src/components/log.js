import React from 'react'
import {arrayOf, element} from 'prop-types'
import Watext from './watext'
import './log.css'

export default class Log extends React.Component {
  static propTypes = {
    logs: arrayOf(element),
  }

  renderLogs() {
    // ok to use index as key because these don't really change, just get appended to.
    return this.props.logs.map((log, index) => {
      return <Watext key={index} watext={log} /> // eslint-disable-line react/no-array-index-key
    })
  }

  render() {
    return (
      <div styleName="root">
        <h2 styleName="header">Log</h2>
        <div styleName="content">{this.renderLogs()}</div>
      </div>
    )
  }
}
