import {bool, string, element, object, arrayOf, objectOf, shape, oneOfType} from 'prop-types'

export const verbShape = shape({
  id: string.isRequired,
  compound: bool,
  connector: string,
})

export const universeShape = shape({
  currentItemId: string,
  log: arrayOf(element),
  itemStates: objectOf(object), // maps `item-id`s to arbitrary item state
})

export const storyShape = shape({
  currentItemDescription: element,
  currentItemVerbs: arrayOf(verbShape),
  currentRoomDescription: element,
  currentRoomVerbs: arrayOf(verbShape),
  playerInventory: objectOf(oneOfType([string, object])), // limited recursion. maps `item-id` to 'item name'
  universe: universeShape,
})
