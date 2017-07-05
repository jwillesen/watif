import Immutable from 'immutable'
import reducer, {DefaultState} from '../index'
import {replaceState} from '../../actions'

it('replaces state', () => {
  const initialState = DefaultState()
  const newLog = Immutable.fromJS(['some text'])
  const newItemStates = Immutable.fromJS({foo: 'bar'})
  let nextState = initialState.set('log', newLog)
  nextState = nextState.set('itemStates', newItemStates)
  nextState = nextState.set('currentItemId', 'some-item')

  const result = reducer(DefaultState, replaceState(nextState))
  expect(result.toJS()).toEqual({
    log: ['some text'],
    itemStates: {foo: 'bar'},
    currentItemId: 'some-item',
  })
})
