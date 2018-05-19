import React from 'react'
import './verb-bar.css'

export default class VerbBar extends React.Component {
  render () {
    return <div styleName="root">
      <h2 styleName="header">Verbs</h2>
      <div styleName="content">This is a verb bar!</div>
    </div>
  }
}
