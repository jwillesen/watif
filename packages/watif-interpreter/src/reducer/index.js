import Immutable from 'immutable'
import itemStatesReducer from './item-states-reducer'
import logReducer from './log-reducer'
import {handleAction} from 'redux-actions'
import {combineReducers} from 'redux-immutable'

// verb structure:
//  {
//    verb: string,
//    compound: bool,
//    connector: string,
// }

export const DefaultState = () => Immutable.fromJS({
  // array of watext
  log: [],
  // itemId string
  currentItemId: null,
  // map itemIds to the Item's state
  itemStates: {},
})

function identity (state, action) { return action.payload }

const combinedReducer = combineReducers({
  log: logReducer,
  currentItemId: handleAction('SET_CURRENT_ITEM', identity, null),
  itemStates: itemStatesReducer,
}, DefaultState)

export default combinedReducer
