import {setItemState} from './actions'
import Immutable from 'immutable'

export default class Universe {
  constructor (store, items) {
    this.store = store
    this.items = items
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
