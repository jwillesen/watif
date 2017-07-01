import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

const reducer = handleActions({
  SET_ITEM_STATE: setItemState,
}, Immutable.Map())
export default reducer

function setItemState (state, action) {
  const {itemId, newItemState} = action.payload
  return state.mergeDeep({[itemId]: newItemState})
}
