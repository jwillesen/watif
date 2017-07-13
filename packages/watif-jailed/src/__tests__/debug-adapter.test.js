import DebugAdapter from '../debug-adapter'

describe('DebugAdapter', () => {
  it('initializes methods on itself from the interface provider', () => {
    const adapter = new DebugAdapter()
    const cb = jest.fn()
    adapter.echo('foo', cb)
    expect(cb).toHaveBeenCalledWith('foo')
  })
})
