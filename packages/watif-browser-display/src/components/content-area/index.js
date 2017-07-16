import React from 'react'
import InventoryTree from '../inventory-tree'
import StoryContent from '../story-content'

export default class ContentArea extends React.Component {
  render () {
    return <div className="watif-content-area">
      <InventoryTree />
      <StoryContent />
    </div>
  }
}
