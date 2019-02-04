import Immutable from 'immutable'
import {handleAction} from 'redux-actions'
import {combineReducers} from 'redux-immutable'
import itemStatesReducer from './item-states-reducer'
import logReducer from './log-reducer'

export const DefaultState = () =>
  Immutable.fromJS({
    // array of watext
    log: [],
    // itemId string
    currentItemId: null,
    // map itemIds to the Item's state
    itemStates: {},
  })

function identity(state, action) {
  return action.payload
}

const combinedReducer = combineReducers(
  {
    log: logReducer,
    currentItemId: handleAction('SET_CURRENT_ITEM', identity, null),
    itemStates: itemStatesReducer,
  },
  DefaultState
)

function globalReducer(state, action) {
  if (action.type === 'REPLACE_STATE') return action.payload
  return state
}

function reducer(state, action) {
  if (state == null) return DefaultState()
  state = globalReducer(state, action)
  state = combinedReducer(state, action)
  return state
}

export default reducer
