/* global application */

import {Engine, Universe} from 'watif-interpreter'
import Adapter from './adapter'

const universe = new Universe()
const engine = new Engine(universe)
const adapter = new Adapter(engine, application) // eslint-disable-line no-unused-vars
// adapter gives its interface to application.setInterface
