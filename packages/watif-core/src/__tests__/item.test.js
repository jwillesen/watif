import Item from '../item'

it('reports its id', () => {
  class SomeKindOfThing extends Item {}
  const thing = new SomeKindOfThing()
  expect(thing.id()).toBe('some-kind-of-thing')
})

it('has a default name', () => {
  class SomeKindOfThing extends Item {}
  const thing = new SomeKindOfThing()
  expect(thing.name()).toBe('some kind of thing')
})

it('has a default examine verb', () => {
  const mockUniverse = {
    setCurrentItem: jest.fn(),
  }
  class LookAtMe extends Item {}
  const thing = new LookAtMe(mockUniverse)
  const result = thing.verbExamine(thing)
  expect(mockUniverse.setCurrentItem).toHaveBeenCalledWith('look-at-me')
  expect(result).not.toBeDefined()
})
