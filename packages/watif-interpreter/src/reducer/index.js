import Immutable from 'immutable'
import itemStatesReducer from './item-states-reducer'
import {combineReducers} from 'redux-immutable'

// verb structure:
//  {
//    verb: string,
//    compound: bool,
//    connector: string,
// }

// export const DefaultState = Immutable.Record({
export const DefaultState = () => Immutable.fromJS({
  // array of watext
  log: [],
  // itemId string
  currentItemId: null,
  // itemId string
  currentRoomId: null,
  // map itemIds to the Item's state
  itemStates: {},

  // calculated values that also need to be communicated to the display
  // because it can't calculate them itself
  // watext
  currentRoomDescription: null,

  // array of verb structures
  currentRoomVerbs: [],

  // watext
  currentItemDescription: null,

  // array of verb structures
  currentItemVerbs: [],

  // the player's inventory and other containers
  //  {
  //    inventory: { itemId: itemName, ...}
  //    otherContainer: { ... }
  //  }
  player: {},
})

function noop (state, action) { return state }

const reducer = combineReducers({
  log: noop,
  currentItemId: noop,
  currentRoomId: noop,
  itemStates: itemStatesReducer,
  currentRoomDescription: noop,
  currentItemDescription: noop,
  inventory: noop,
}, DefaultState)

export default reducer
