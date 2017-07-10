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

it('creates items with itself', () => {
  const mockStory = createStory()
  const universe = new Universe(mockStory)
  expect(mockStory.items.fake).toHaveBeenCalledWith(universe)
})

it('remembers item state', () => {
  const universe = new Universe(createStory())
  universe.setStateOf('fake', {some: 'data'})
  expect(universe.getStateOf('fake')).toEqual({some: 'data'})
})

it('uses the initial state of the item', () => {
  const universe = new Universe(createStory()) // eslint-disable-line no-unused-vars
  expect(universe.getStateOf('fake')).toEqual({some: 'state'})
})

it('creates special items if they are missing from the story', () => {
  const universe = new Universe(createStory())
  expect(universe.getItem('player')).toBeDefined()
  expect(universe.getItem('inventory')).toBeDefined()
  expect(universe.getStateOf('inventory')).toEqual({location: 'player'})
})

it('does not overwrite special items if they are present in the story', () => {
  const mockStory = createStory({
    player: createFakeItem('player'),
    inventory: createFakeItem('inventory'),
  })
  const universe = new Universe(mockStory)
  expect(universe.getItem('player')).toBeInstanceOf(mockStory.items.player)
  expect(universe.getItem('inventory')).toBeInstanceOf(mockStory.items.inventory)
})

it('throws on duplciate item ids', () => {
  const mockStory = createStory({
    first: createFakeItem('badid'),
    second: createFakeItem('badid'),
  })
  expect(() => new Universe(mockStory)).toThrow()
})

it('calls the story initialize method after items are created', () => {
  const mockStory = createStory()
  mockStory.initialize = jest.fn((universe) => {
    expect(universe.getItem('fake')).toBeDefined()
  })
  const universe = new Universe(mockStory)
  expect(mockStory.initialize).toHaveBeenCalledWith(universe)
})

it('sets the current item', () => {
  const universe = new Universe(createStory())
  universe.setCurrentItem('fake')
  expect(universe.getUniverseState().currentItemId).toBe('fake')
})

it('appends log entries', () => {
  const universe = new Universe(createStory())
  universe.addLogEntry('some foo')
  expect(universe.getUniverseState().log).toEqual(['some foo'])
})

it('replaces the state', () => {
  const universe = new Universe(createStory())
  const replacementState = {
    log: ['foo', 'bar'],
    currentItemId: 'baz',
    itemStates: {some: 'state'},
  }
  universe.setUniverseState(replacementState)
  expect(universe.getUniverseState()).toEqual(replacementState)
})
