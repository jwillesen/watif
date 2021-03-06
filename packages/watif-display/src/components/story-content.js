import React from 'react'
import {func} from 'prop-types'
import {storyShape} from '../property-shapes'
import Log from './log'
import InteractiveDescription from './interactive-description'
import './story-content.css'

export default class StoryContent extends React.Component {
  static propTypes = {
    storyState: storyShape.isRequired,
    onItemClick: func,
    executeVerb: func,
  }

  handleItemVerbClick = verb => {
    this.props.executeVerb({
      id: verb.id,
      subject: this.props.storyState.universe.currentItemId,
    })
  }

  render() {
    return (
      <div styleName="root">
        <div styleName="log">
          <Log logs={this.props.storyState.universe.log} />
        </div>
        <div styleName="current-room">
          <InteractiveDescription
            title="Current Room"
            emptyText="No current room"
            watext={this.props.storyState.currentRoomDescription}
            verbs={this.props.storyState.currentRoomVerbs}
            onItemClick={this.props.onItemClick}
          />
        </div>
        <div styleName="current-item">
          <InteractiveDescription
            title="Current Item"
            emptyText="No current item"
            watext={this.props.storyState.currentItemDescription}
            verbs={this.props.storyState.currentItemVerbs}
            onItemClick={this.props.onItemClick}
            onVerbClick={this.handleItemVerbClick}
          />
        </div>
      </div>
    )
  }
}
