import React from 'react'
import InventoryTree from '../inventory-tree'
import StoryContent from '../story-content'
import './style.css'

export default class ContentArea extends React.Component {
  render () {
    return <div styleName="root">
      <InventoryTree />
      <StoryContent />
    </div>
  }
}
