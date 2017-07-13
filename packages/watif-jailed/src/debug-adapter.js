import {Engine, Universe} from 'watif-interpreter'
import InterfaceProvider from './interface-provider'

export default class DebugAdapter {
  constructor () {
    this.universe = new Universe()
    this.engine = new Engine(this.universe)
    this.provider = new InterfaceProvider(this.engine, this)
  }

  setInterface (methods) {
    Object.assign(this, methods)
  }
}
