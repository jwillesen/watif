import {setItemState} from './actions'
import Immutable from 'immutable'
import {Player, Inventory} from 'watif-story'

export default class Universe {
  constructor (store, story) {
    this.store = store
    this.story = story
    this.bigBang()
  }

  bigBang () {
    this.createItems()
    this.createSpecialItems()
    if (this.story.initialize) this.story.initialize(this)
  }

  createItems () {
    const itemClasses = this.story.items
    this.items = {}
    Object.values(itemClasses).forEach((ItemClass) => {
      this.createItem(ItemClass)
    })
  }

  createItem (ItemClass) {
    const newItem = new ItemClass(this)
    const newItemId = newItem.id()
    if (this.items[newItemId]) throw new Error(`Duplicate item id: '${newItemId}'`)
    this.items[newItemId] = newItem
    this.setStateOf(newItemId, newItem.initialState())
  }

  createSpecialItems () {
    this.createSpecialItem('player', Player)
    this.createSpecialItem('inventory', Inventory)
  }

  createSpecialItem (itemId, ItemClass) {
    if (!this.getItem(itemId)) this.createItem(ItemClass)
  }

  getItem (itemId) {
    return this.items[itemId]
  }

  getStateOf (itemId) {
    return this.store.getState().getIn(['itemStates', itemId]).toJS()
  }

  setStateOf (itemId, newState) {
    return this.store.dispatch(setItemState(itemId, Immutable.fromJS(newState)))
  }
}
