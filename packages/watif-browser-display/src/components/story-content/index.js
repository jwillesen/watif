import React from 'react'
import Log from '../log'
import InteractiveDescription from '../interactive-description'

export default class StoryContent extends React.Component {
  render () {
    return <div className="watif-story-content">
      <Log />
      <InteractiveDescription />
      <InteractiveDescription />
    </div>
  }
}
