import Immutable from 'immutable'
import Universe from '../universe'

function createFakeItem (id = 'fake', initialState = {some: 'state'}) {
  const fake = jest.fn()
  fake.prototype.id = () => id
  fake.prototype.initialState = jest.fn(() => initialState)
  return fake
}

function createStory (items) {
  if (!items) items = { fake: createFakeItem() }
  return { items }
}

function createStore (state) {
  state = state || Immutable.fromJS({
    itemStates: {
      fake: { some: 'data' },
    },
  })
  return {
    getState: jest.fn(() => state),
    dispatch: jest.fn(),
  }
}

it('creates items with itself', () => {
  const mockStory = createStory()
  const universe = new Universe(createStore(), mockStory)
  expect(mockStory.items.fake).toHaveBeenCalledWith(universe)
})

it('finds an item state and coverts it to a pojo', () => {
  const universe = new Universe(createStore(), createStory())
  expect(universe.getStateOf('fake')).toEqual({some: 'data'})
})

it('uses the initial state of the item', () => {
  const mockStore = createStore()
  const universe = new Universe(mockStore, createStory()) // eslint-disable-line no-unused-vars
  expect(mockStore.dispatch).toHaveBeenCalledWith({
    type: 'SET_ITEM_STATE',
    payload: {
      itemId: 'fake',
      newItemState: Immutable.fromJS({some: 'state'}),
    },
  })
})

it('creates special items if they are missing from the story', () => {
  const universe = new Universe(createStore(), createStory())
  expect(universe.getItem('player')).toBeDefined()
  expect(universe.getItem('inventory')).toBeDefined()
})

it('does not overwrite special items if they are present in the story', () => {
  const mockStory = createStory({
    player: createFakeItem('player'),
    inventory: createFakeItem('inventory'),
  })
  const universe = new Universe(createStore(), mockStory)
  expect(universe.getItem('player')).toBeInstanceOf(mockStory.items.player)
  expect(universe.getItem('inventory')).toBeInstanceOf(mockStory.items.inventory)
})

it('dispatches state changes and converts pojo to immutable', () => {
  const mockStore = createStore()
  const universe = new Universe(mockStore, createStory())
  universe.setStateOf('fake', {some: 'data'})
  expect(mockStore.dispatch).toHaveBeenCalledWith({
    type: 'SET_ITEM_STATE',
    payload: {
      itemId: 'fake',
      newItemState: Immutable.fromJS({some: 'data'}),
    },
  })
})

it('throws on duplciate item ids', () => {
  const mockStory = createStory({
    first: createFakeItem('badid'),
    second: createFakeItem('badid'),
  })
  expect(() => new Universe(createStore(), mockStory)).toThrow()
})

it('calls the story initialize method after items are created', () => {
  const mockStory = createStory()
  mockStory.initialize = jest.fn((universe) => {
    expect(universe.getItem('fake')).toBeDefined()
  })
  const universe = new Universe(createStore(), mockStory)
  expect(mockStory.initialize).toHaveBeenCalledWith(universe)
})
