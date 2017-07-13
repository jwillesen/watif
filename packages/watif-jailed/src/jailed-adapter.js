
export default class JailedAdapter {
  constructor (JailedPluginClass, bootstrap, onStop) {
    this.bootstrap = bootstrap
    this.onStop = onStop
    this.connected = false
    this.JailedPluginClass = JailedPluginClass
  }

  start () {
    this.plugin = new this.JailedPluginClass(this.bootstrap, {})
    return new Promise((resolve, reject) => {
      this.plugin.whenConnected(() => {
        this.connected = true
        resolve()
      })

      this.plugin.whenFailed(() => reject(new Error('jailed plugin failed to start')))
      this.plugin.whenDisconnected(() => {
        this.connected = false
        this.onStop()
      })
    })
  }

  stop () {
    this.plugin.disconnect()
    this.connected = false
  }

  isConnected () { return this.connected }

  _checkConnected () {
    if (!this.isConnected()) throw new Error('method invoked while jailed plugin is disconnected')
  }

  echo (message, cb) {
    this._checkConnected()
    this.plugin.remote.echo(message, cb)
  }

  loadStory (storyCode, cb) {
    this._checkConnected()
    this.plugin.remote.loadStory(storyCode, cb)
  }

  executeVerb (verbInvokation, cb) {
    this._checkConnected()
    this.plugin.remote.executeVerb(verbInvokation, cb)
  }

  replaceState (newState, cb) {
    this._checkConnected()
    this.plugin.remote.replaceState(newState, cb)
  }
}
