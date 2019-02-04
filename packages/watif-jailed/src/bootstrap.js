// eslint-disable-next-line import/no-unresolved
import application from 'application' // import the global from jailed
import {Engine, Universe} from '@watif/interpreter'
import InterfaceProvider from './interface-provider'

const universe = new Universe()
const engine = new Engine(universe)
const provider = new InterfaceProvider(engine, application) // eslint-disable-line no-unused-vars
// provider gives its interface to application.setInterface
// wait for display to invoke the provider methods via jailed
