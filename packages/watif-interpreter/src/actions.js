import Immutable from 'immutable'
import { createActions } from 'redux-actions'

export const {
  setItemState,
  setCurrentRoom,
  setCurentItem,
  computeDisplayValues,
  executeVerb,

} = createActions({

/* eslint-disable indent */
SET_ITEM_STATE: (itemId, newItemState) => { // (string, [Object | Immutable.Map])
  if (!Immutable.Map.isMap(newItemState)) {
    newItemState = Immutable.fromJS(newItemState)
  }
  return { itemId, newItemState }
},

},

'SET_CURRENT_ROOM',       // (itemId: string)
'SET_CURRENT_ITEM',       // (itemId: string)
'ADD_LOG_ENTRY',          // (entry: watext)

'EXECUTE_VERB',           // (verb invokation)

'COMPUTE_DISPLAY_VALUES'  // ()

)
/* eslint-enable indent */

// verb invokation:
//  {
//    verb: string,
//    subject: itemId,
//    object: itemId,
//  }
