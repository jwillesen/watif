import Immutable from 'immutable'
import { createActions } from 'redux-actions'

export const {
  setItemState,
  setCurentItem,
} = createActions({

/* eslint-disable indent */
SET_ITEM_STATE: (itemId, newItemState) => { // (string, [Object | Immutable.Map])
  if (!Immutable.Map.isMap(newItemState)) {
    newItemState = Immutable.fromJS(newItemState)
  }
  return { itemId, newItemState }
},

},

'SET_CURRENT_ITEM',       // (itemId: string)
'ADD_LOG_ENTRY',          // (entry: watext)
)
/* eslint-enable indent */
