import {createActions} from 'redux-actions'

export const {setItemState, replaceState, setCurrentItem, addLogEntry} = createActions(
  {
    SET_ITEM_STATE: (itemId, newItemState) => {
      return {itemId, newItemState}
    },
  },
  'REPLACE_STATE',
  'ADD_LOG_ENTRY',
  'SET_CURRENT_ITEM' // (itemId: string)
)
