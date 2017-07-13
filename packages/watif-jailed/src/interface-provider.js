import errorToJson from 'utils-error-to-json'

export default class InterfaceProvider {
  constructor (engine, application) {
    this.engine = engine
    this.application = application
    this.application.setInterface({
      echo: this.echo,
      loadStory: this.loadStory,
      executeVerb: this.executeVerb,
      replaceState: this.replaceState,
    })
  }

  protect (fn) {
    this.error = null
    try {
      fn()
    } catch (err) {
      this.error = err
    }
  }

  sendDisplayData (cb) {
    const displayData = this.engine.getDisplayData()
    if (this.error) displayData.error = errorToJson(this.error)
    cb(displayData)
  }

  echo = (message, cb) => {
    cb(message)
  }

  loadStory = (storyCode, cb) => {
    this.protect(() => this.engine.loadStory(storyCode))
    this.sendDisplayData(cb)
  }

  executeVerb = (verbInvokation, cb) => {
    this.protect(() => this.engine.executeVerb(verbInvokation))
    this.sendDisplayData(cb)
  }

  replaceState = (newState, cb) => {
    this.protect(() => this.engine.replaceState(newState))
    this.sendDisplayData(cb)
  }
}
