import {Engine, Universe} from 'watif-interpreter'

export default class DebugAdapter {
  constructor () {
    this.universe = new Universe()
    this.engine = new Engine(this.universe)
  }

  sendDisplayData (cb) {
    cb(this.engine.getDisplayData())
  }

  echo = (message, cb) => {
    cb(message)
  }

  loadStory = (storyCode, cb) => {
    this.engine.loadStory(storyCode)
    this.sendDisplayData(cb)
  }

  executeVerb = (verbInvokation, cb) => {
    this.engine.executeVerb(verbInvokation)
    this.sendDisplayData(cb)
  }

  replaceState = (newState, cb) => {
    this.engine.replaceState(newState)
    this.sendDisplayData(cb)
  }
}
