import React from 'react'
import Log from '../log'
import InteractiveDescription from '../interactive-description'
import './style.css'

export default class StoryContent extends React.Component {
  render () {
    return <div styleName="root">
      <div styleName="log"><Log /></div>
      <div styleName="current-room"><InteractiveDescription /></div>
      <div styleName="current-item"><InteractiveDescription /></div>
    </div>
  }
}
