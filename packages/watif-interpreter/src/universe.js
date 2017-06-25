import {setItemState} from './actions'
import Immutable from 'immutable'

export default class Universe {
  constructor (store, story) {
    this.store = store
    this.story = story
    this.bigBang()
  }

  bigBang () {
    const itemClasses = this.story.items
    this.items = {}
    // TODO: initialize special items, like player and inventory
    Object.values(itemClasses).forEach((ItemClass) => {
      const newItem = new ItemClass(this)
      const newItemId = newItem.id()
      if (this.items[newItemId]) throw new Error(`Duplicate item id: '${newItemId}'`)
      this.items[newItemId] = newItem
      this.setStateOf(newItemId, {})
    })
  }

  getItem (itemId) {
    this.items.get(itemId)
  }

  getStateOf (itemId) {
    return this.store.getState().getIn(['itemStates', itemId]).toJS()
  }

  setStateOf (itemId, newState) {
    return this.store.dispatch(setItemState(itemId, Immutable.fromJS(newState)))
  }
}
