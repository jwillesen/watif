import JailedAdapter from '../jailed-adapter'

let mockPlugin = null

class MockPluginClass {
  constructor (url, api) {
    mockPlugin = this
    this.url = url
    this.api = api
  }
  whenConnected = jest.fn((cb) => { this.connectedCallback = cb })
  whenFailed = jest.fn((cb) => { this.failedCallback = cb })
  whenDisconnected = jest.fn((cb) => { this.disconnected = cb })
  disconnect = jest.fn()
  remote = {
    echo: jest.fn(),
  }
}

describe('JailedAdapter', () => {
  afterEach(() => { mockPlugin = null })

  it('passes the specified bootstrap parameter to the jailed plugin', () => {
    const adapter = new JailedAdapter(MockPluginClass, 'some url', jest.fn())
    adapter.start()
    expect(mockPlugin.url).toBe('some url')
  })

  it('reports connected after the connected call has gone through', () => {
    const adapter = new JailedAdapter(MockPluginClass, 'some url', jest.fn())
    adapter.start()
    expect(adapter.isConnected()).toBeFalsy()
    mockPlugin.connectedCallback()
    expect(adapter.isConnected()).toBeTruthy()
  })

  it('resolves the promise when connected', () => {
    const adapter = new JailedAdapter(MockPluginClass, 'some url', jest.fn())
    const promise = adapter.start()
    mockPlugin.connectedCallback()
    return promise.catch(() => {
      expect(false).toBe('expected this to resolve but it rejected instead')
    })
  })

  it('rejects the promise when failed', () => {
    const adapter = new JailedAdapter(MockPluginClass, 'some url', jest.fn())
    const promise = adapter.start()
    mockPlugin.failedCallback()
    return promise.then(() => {
      expect(false).toBe('expected this to reject but it resolved instead')
    }).catch(() => {}) // actually passes when it rejects
  })

  it('forwards calls to the plugin', () => {
    const adapter = new JailedAdapter(MockPluginClass, 'some url', jest.fn())
    adapter.start()
    mockPlugin.connectedCallback()
    const cb = jest.fn()
    adapter.echo('foo', cb)
    expect(mockPlugin.remote.echo).toHaveBeenCalledWith('foo', cb)
  })

  it('calls the onStop method when the disconnected method is called', () => {
    const onStop = jest.fn()
    const adapter = new JailedAdapter(MockPluginClass, 'some url', onStop)
    adapter.start()
    mockPlugin.disconnected()
    expect(onStop).toHaveBeenCalled()
  })

  it('throws if methods are called before the plugin is connected', () => {
    const adapter = new JailedAdapter(MockPluginClass, 'some url', jest.fn())
    adapter.start()
    expect(() => adapter.echo()).toThrow()
  })

  it('disconnects when requested', () => {
    const adapter = new JailedAdapter(MockPluginClass, 'some url', jest.fn())
    adapter.start()
    adapter.stop()
    expect(mockPlugin.disconnect).toHaveBeenCalled()
  })
})
