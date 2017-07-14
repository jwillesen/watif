import Engine from '../engine'
import Universe from '../universe'
import {Item} from 'watif-core'
import changeCase from 'change-case'

function createItemClass (opts) {
  if (!opts.id) throw new Error(`createItemClass requires an id: ${opts}`)
  const verb = opts.verb || jest.fn(() => `return value of ${verbName}`)
  const verbName = verb.id || 'foo'
  const verbMethodName = changeCase.camel(`verb ${verbName}`)

  return class extends Item {
    constructor (...args) {
      super(...args)
      this[verbMethodName] = verb
    }
    id () { return opts.id }
    name () { return this.id() }
    description () { return opts.description || `description of ${opts.id}` }
    initialState () { return opts.initialState || {} }
  }
}

function createUniverse (customItemClasses) {
  const itemClasses = {
    subject: createItemClass({id: 'subject'}),
    target: createItemClass({id: 'target'}),
    ...customItemClasses,
  }

  return new Universe({items: itemClasses})
}

function createEngine (customItemClasses) {
  const universe = createUniverse(customItemClasses)
  const engine = new Engine(universe)
  return {engine, universe}
}

describe('loadStory', () => {
  it('passes through objects to the universe', () => {
    const universe = createUniverse()
    universe.bigBang = jest.fn()
    const engine = new Engine(universe)
    const story = {}
    engine.loadStory(story)
    expect(universe.bigBang).toHaveBeenCalledWith(story)
  })

  // a direct call to eval doesn't work in a jest environment: it's not bound to the right context,
  // as if it were an indirect eval call instead of a direct one. This makes it impossible to
  // actually run this test. Running manual tests in Node and Chrome indicates the eval should
  // work fine and doesn't get transpiled by babel to an indirect call.
  xit('evals strings and passes the resulting object to the universe', () => {
    const universe = createUniverse()
    universe.bigBang = jest.fn()
    const engine = new Engine(universe)
    const someStory = 'var story = "some story"'
    engine.loadStory(someStory)
    expect(universe.bigBang).toHaveBeenCalledWith('some story')
  })
})

describe('executeVerb', () => {
  it('throws if there is no subject', () => {
    const {engine} = createEngine()
    expect(() => engine.executeVerb({id: 'foo'})).toThrow()
  })

  it('throws if the subject does not exist', () => {
    const {engine} = createEngine()
    expect(() => engine.executeVerb({id: 'foo', subject: 'does-not-exist'})).toThrow()
  })

  it('throws if the verb does not exist', () => {
    const {engine} = createEngine()
    expect(() => engine.executeVerb({id: 'does-not-exist', subject: 'subject'})).toThrow()
  })

  it('throws if the target does not exist', () => {
    const {engine} = createEngine()
    expect(() => engine.executeVerb({id: 'foo', subject: 'subject', target: 'does-not-exist'})).toThrow()
  })

  it('executes a verb on the subject item', () => {
    const {engine, universe} = createEngine()
    engine.executeVerb({id: 'foo', subject: 'subject'})
    const subject = universe.getItem('subject')
    expect(subject.verbFoo).toHaveBeenCalled()
    expect(subject.verbFoo.mock.instances[0]).toBe(subject)
  })

  it('passes the target id to the verb function handler', () => {
    const {engine, universe} = createEngine()
    const subject = universe.getItem('subject')
    engine.executeVerb({id: 'foo', subject: 'subject', target: 'target'})
    expect(subject.verbFoo).toHaveBeenCalledWith('target')
  })

  it('does change-case on multi-word verbs', () => {
    const putDownItem = createItemClass({id: 'item', verb: {id: 'put down', action: jest.fn()}})
    const {engine, universe} = createEngine({putDownItem})
    engine.executeVerb({id: 'put-down', subject: 'item'})
    expect(universe.getItem('item').verbPutDown.action).toHaveBeenCalled()
  })

  it('calls complex verb definitions with subject item', () => {
    const openItemClass = createItemClass({
      id: 'open-item',
      verb: {
        id: 'open',
        enabled: jest.fn(() => true),
        action: jest.fn(),
      },
    })
    const {engine, universe} = createEngine({openItemClass})
    engine.executeVerb({id: 'open', subject: 'open-item', target: 'target'})
    const openItem = universe.getItem('open-item')
    const verbOpen = openItem.verbOpen
    expect(verbOpen.enabled).toHaveBeenCalledWith('target')
    expect(verbOpen.enabled.mock.instances[0]).toBe(openItem)
    expect(verbOpen.action).toHaveBeenCalledWith('target')
    expect(verbOpen.action.mock.instances[0]).toBe(openItem)
  })

  it('throws if the verb is not enabled', () => {
    const mockItemClass = createItemClass({
      id: 'mock',
      verb: {
        id: 'open',
        enabled: jest.fn(() => false),
        action: jest.fn(),
      },
    })
    const {engine} = createEngine({mockItemClass})
    expect(() => engine.executeVerb({id: 'open', subject: 'mock', target: 'target'})).toThrow()
  })

  it('requires an action method for complex verbs', () => {
    const mockItemClass = createItemClass({
      id: 'mock',
      verb: {
        id: 'mock',
        enabled: () => true,
      },
    })
    const {engine} = createEngine({mockItemClass})
    expect(() => engine.executeVerb({id: 'mock', subject: 'mock'})).toThrow()
  })

  it('returns the return value of the verb method', () => {
    const {engine} = createEngine()
    expect(engine.executeVerb({id: 'foo', subject: 'subject'})).toBe('return value of foo')
  })

  it('returns the return value of the complex verb method', () => {
    const mockItemClass = createItemClass({
      id: 'mock',
      verb: {
        id: 'open',
        name: 'open',
        action: jest.fn(() => 'return value of complex method'),
      },
    })
    const {engine} = createEngine({mockItemClass})
    const result = engine.executeVerb({id: 'open', subject: 'mock', target: 'target'})
    expect(result).toBe('return value of complex method')
  })
})

describe('getDisplayData', () => {
  it('includes the current universe state', () => {
    const {engine, universe} = createEngine()
    universe.setStateOf('subject', {foo: 'bar'})
    universe.setCurrentItem('subject')
    const display = engine.getDisplayData()
    expect(display.universe.itemStates).toMatchObject({subject: {foo: 'bar'}, target: {}})
    expect(display.universe.currentItemId).toBe('subject')
    expect(display.universe.log).toEqual([])
  })

  it('includes the current item description', () => {
    const {engine, universe} = createEngine()
    universe.setCurrentItem('subject')
    expect(engine.getDisplayData().currentItemDescription).toBe('description of subject')
  })

  it('excludes description if there is no current item', () => {
    const {engine} = createEngine()
    expect(engine.getDisplayData().currentItemDescription).toBeNull()
  })

  it('sets the current room description', () => {
    const {engine, universe} = createEngine()
    universe.setStateOf('player', {location: 'target'})
    expect(engine.getDisplayData().currentRoomDescription).toBe('description of target')
  })

  it('excludes the room description if there is no current room', () => {
    const {engine} = createEngine()
    expect(engine.getDisplayData().currentRoomDescription).toBeNull()
  })

  it('constructs the player inventory tree', () => {
    const {engine, universe} = createEngine({
      knowledge: createItemClass({id: 'knowledge'}),
      contained: createItemClass({id: 'contained'}),
      fact: createItemClass({id: 'fact'}),
      other: createItemClass({id: 'other'}),
    })
    Array.of('subject', 'target').forEach(item => universe.setStateOf(item, {location: 'inventory'}))
    universe.setStateOf('knowledge', {location: 'player'})
    universe.setStateOf('fact', {location: 'knowledge'})
    universe.setStateOf('contained', {location: 'subject'})
    const playerStuff = engine.getDisplayData().playerInventory
    expect(playerStuff).toEqual({
      inventory: {
        name: 'inventory',
        contents: {
          subject: { name: 'subject' },
          target: { name: 'target' },
        },
      },
      knowledge: {
        name: 'knowledge',
        contents: {
          fact: { name: 'fact' },
        },
      },
    })
  })
})
