import * as matchers from 'jest-immutable-matchers'
import * as Actions from '../actions'
import Immutable from 'immutable'

beforeAll(() => {
  jest.addMatchers(matchers)
})

describe('setItemState', () => {
  it('accepts a Map', () => {
    const newStateMap = Immutable.Map({foo: 'bar'})
    const result = Actions.setItemState('42', newStateMap)
    expect(result).toMatchSnapshot()
  })

  it('deeply converts a pojo to Immutable.Map', () => {
    const newStatePojo = { foo: 'bar', baz: {bing: 42} }
    const result = Actions.setItemState('42', newStatePojo)
    const newItemState = result.payload.newItemState
    expect(Immutable.Map.isMap(newItemState)).toBeTruthy()
    expect(Immutable.Map.isMap(newItemState.get('baz'))).toBeTruthy()
  })
})
