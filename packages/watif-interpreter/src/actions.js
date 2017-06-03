export function setItemState (itemId, newState) {
  return {
    type: 'SET_ITEM_STATE',
    payload: {
      itemId: itemId,
      newState: newState,
    },
  }
}
