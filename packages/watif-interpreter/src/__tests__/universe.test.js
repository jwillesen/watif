import Immutable from 'immutable'
import Universe from '../universe'

it('finds item states', () => {
  const mockStore = {
    getState () {
      return Immutable.fromJS({
        itemStates: { someItem: { some: 'data' } },
      })
    },
  }
  const universe = new Universe(mockStore)
  expect(universe.getStateOf('someItem')).toEqual({some: 'data'})
})

it('dispatches state changes', () => {
  const mockStore = {
    dispatch: jest.fn(),
  }
  const universe = new Universe(mockStore)
  universe.setStateOf('someItem', {some: 'data'})
  expect(mockStore.dispatch).toHaveBeenCalledWith({
    type: 'SET_ITEM_STATE',
    payload: {
      itemId: 'someItem',
      newItemState: Immutable.fromJS({some: 'data'}),
    },
  })
})
