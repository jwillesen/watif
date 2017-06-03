import Immutable from 'immutable'

const defaultState = Immutable.fromJS({
  // the storyState can be replaced wholesale to implement undo/redo/editing
  storyState: {
    // array of watext
    log: [],

    // watext
    currentRoomDescription: null,

    // watext
    currentItemDescription: null,

    // map itemIds to the Item's state
    itemStates: {},
  },

  // map itemIds to Item instances
  items: {},
})

export default function (state, action) {
  if (!state) return defaultState

  if (action.type === 'SET_ITEM_STATE') {
    const {itemId, newState} = action.payload
    return state.mergeDeep({states: {[itemId]: newState}})
  }
}
