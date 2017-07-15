import {createStore} from 'redux'
import Immutable from 'immutable'
import {Player, Inventory} from 'watif-core'
import {setItemState, replaceState, addLogEntry, setCurrentItem} from './actions'
import reducer from './reducer'

export default class Universe {
  constructor (story) {
    this.store = createStore(reducer)
    if (story) this.bigBang(story)
  }

  bigBang (story) {
    this.story = story
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
    this.setStateOf(newItemId, {})
  }

  createSpecialItems () {
    this.createSpecialItem('player', Player)
    this.createSpecialItem('inventory', Inventory)
  }

  createSpecialItem (itemId, ItemClass) {
    if (!this.getItem(itemId)) this.createItem(ItemClass)
  }

  getUniverseState () {
    return this.store.getState().toJS()
  }

  setUniverseState (newState) {
    this.store.dispatch(replaceState(Immutable.fromJS(newState)))
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

  setCurrentItem (itemId) {
    this.store.dispatch(setCurrentItem(itemId))
  }

  addLogEntry (watext) {
    this.store.dispatch(addLogEntry(Immutable.fromJS(watext)))
  }
}
