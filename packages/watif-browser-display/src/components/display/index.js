import React from 'react'
import {bool, string, element, func, object, arrayOf, objectOf, shape, oneOfType} from 'prop-types'
import InventoryTree from '../inventory-tree'
import StoryContent from '../story-content'
import './style.css'

const verbShape = shape({
  id: string.isRequired,
  compound: bool,
  connector: string,
})

const universeShape = shape({
  currentItemId: string,
  log: arrayOf(element),
  itemStates: objectOf(object), // maps `item-id`s to arbitrary item state
})

const storyShape = shape({
  currentItemDescription: element,
  currentItemVerbs: arrayOf(verbShape),
  currentRoomDescription: element,
  currentRoomVerbs: arrayOf(verbShape),
  playerInventory: objectOf(oneOfType([string, object])), // limited recursion. maps `item-id` to 'item name'
  universe: universeShape,
})

export default class Display extends React.Component {
  static propTypes = {
    executeVerb: func, // { id: verb-id, subject: item-id, target: (item-id | null) }
    storyState: storyShape,
  }

  render () {
    return <div styleName='root'>
      <InventoryTree />
      <StoryContent />
    </div>
  }
}
