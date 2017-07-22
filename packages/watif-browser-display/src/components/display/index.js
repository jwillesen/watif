import React from 'react'
import { func } from 'prop-types'
import InventoryTree from '../inventory-tree'
import StoryContent from '../story-content'
import {storyShape} from '../../property-shapes'
import './style.css'

export default class Display extends React.Component {
  static propTypes = {
    storyState: storyShape.isRequired,
    executeVerb: func, // ({ id: verb-id, subject: item-id, target: (item-id | null) })
  }

  handleItemClick = (itemId) => {
    if (this.props.executeVerb) {
      this.props.executeVerb({
        id: 'examine',
        subject: itemId,
        target: null,
      })
    }
  }

  render () {
    return <div styleName='root'>
      <div styleName="inventory-tree"><InventoryTree /></div>
      <div styleName="story-content">
        <StoryContent
          storyState={this.props.storyState}
          onItemClick={this.handleItemClick}
        />
      </div>
    </div>
  }
}
