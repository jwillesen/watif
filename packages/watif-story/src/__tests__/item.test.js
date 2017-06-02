import Item from '../item'

it('reports its id', () => {
  class SomeKindOfThing extends Item {}
  const thing = new SomeKindOfThing()
  expect(thing.id()).toBe('some-kind-of-thing')
})
