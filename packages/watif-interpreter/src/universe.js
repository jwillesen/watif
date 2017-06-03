import {setItemState} from './actions'
import Immutable from 'immutable'

export default class Universe {
  constructor (store) {
    this.store = store
  }

  getItem (itemId) {
    return this.store.getState().getIn(['items', itemId])
  }

  getStateOf (itemId) {
    return this.store.getState().getIn(['states', itemId]).toJS()
  }

  setStateOf (itemId, newState) {
    return this.store.dispatch(setItemState(itemId, Immutable.fromJS(newState)))
  }
}
