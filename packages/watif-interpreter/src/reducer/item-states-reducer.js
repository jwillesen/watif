export default function itemStatesReducer (state, action) {
  if (action.type === 'SET_ITEM_STATE') {
    const {itemId, newItemState} = action.payload
    return state.mergeDeep({[itemId]: newItemState})
  }
  return state
}
