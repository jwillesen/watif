import InterfaceProvider from '../interface-provider'

function mockEngine () {
  return {
    loadStory: jest.fn(),
    executeVerb: jest.fn(),
    replaceState: jest.fn(),
    getDisplayData: jest.fn(() => ({display: 'data'})),
  }
}

function mockApp () {
  return {
    setInterface: jest.fn(),
  }
}

it('registers callbacks', () => {
  const app = mockApp()
  const engine = mockEngine()
  const adapter = new InterfaceProvider(engine, app) // eslint-disable-line no-unused-vars
  expect(app.setInterface).toHaveBeenCalledWith(expect.objectContaining({
    loadStory: expect.anything(),
    executeVerb: expect.anything(),
    replaceState: expect.anything(),
  }))
  const adapterInterface = app.setInterface.mock.calls[0][0]
  const verb = {id: 'foo', subject: 'bar'}
  adapterInterface.executeVerb(verb, jest.fn())
  expect(engine.executeVerb).toHaveBeenCalledWith(verb)
})

it('has an echo method for integration testing', () => {
  const adapter = new InterfaceProvider(mockEngine(), mockApp())
  const cb = jest.fn()
  adapter.echo('some message', cb)
  expect(cb).toHaveBeenCalledWith('some message')
})

it('calls loadStory and the callback with display data', () => {
  const story = {}
  const cb = jest.fn()
  const engine = mockEngine()
  const adapter = new InterfaceProvider(engine, mockApp())
  adapter.loadStory(story, cb)
  expect(engine.loadStory).toHaveBeenCalledWith(story)
  expect(cb).toHaveBeenCalledWith({display: 'data'})
})

it('calls executeVerb and callback with display data', () => {
  const verb = {id: 'foo', subject: 'some-item'}
  const cb = jest.fn()
  const engine = mockEngine()
  const adapter = new InterfaceProvider(engine, mockApp())
  adapter.executeVerb(verb, cb)
  expect(engine.executeVerb).toHaveBeenCalledWith(verb)
  expect(cb).toHaveBeenCalledWith({display: 'data'})
})

it('calls replaceState and callback with display data', () => {
  const newState = {}
  const cb = jest.fn()
  const engine = mockEngine()
  const adapter = new InterfaceProvider(engine, mockApp())
  adapter.replaceState(newState, cb)
  expect(engine.replaceState).toHaveBeenCalledWith(newState)
  expect(cb).toHaveBeenCalledWith({display: 'data'})
})

it('catches errors and reports them in display data', () => {
  const verb = {id: 'foo', subject: 'some-item'}
  const cb = jest.fn()
  const engine = mockEngine()
  engine.executeVerb = jest.fn(() => { throw new Error('mock error') })
  const adapter = new InterfaceProvider(engine, mockApp())
  adapter.executeVerb(verb, cb)
  expect(engine.executeVerb).toHaveBeenCalledWith(verb)
  expect(cb).toHaveBeenCalledWith(expect.objectContaining({
    display: 'data',
    error: expect.objectContaining({
      message: 'mock error',
      name: 'Error',
    }),
  }))
})
