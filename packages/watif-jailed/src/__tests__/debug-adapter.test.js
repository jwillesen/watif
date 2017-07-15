import DebugAdapter from '../debug-adapter'

describe('DebugAdapter', () => {
  it('invokes callbacks', () => {
    const adapter = new DebugAdapter()
    const cb = jest.fn()
    adapter.echo('foo', cb)
    expect(cb).toHaveBeenCalledWith('foo')
  })
})
