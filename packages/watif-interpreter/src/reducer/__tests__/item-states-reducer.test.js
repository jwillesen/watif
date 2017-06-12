import Immutable from 'immutable'
import rootReducer from '../index'
import reducer from '../item-states-reducer'
import {setItemState} from '../../actions'

it('merges item states', () => {
  let nextState = reducer(Immutable.Map(),
    setItemState('master-sword', {location: 'spooky-forest'}))
  expect(nextState).toMatchSnapshot()
  nextState = reducer(nextState,
    setItemState('master-sword', {power: 42}))
  expect(nextState.toJS()).toMatchSnapshot()
})

it('deep merges item states', () => {
  const currentState = Immutable.fromJS({
    'some-item': {
      firstLevel: {
        foo: '1',
        bar: '2',
        baz: '3',
      },
    },
  })
  const result = reducer(currentState, setItemState('some-item', {
    otherFirstLevel: 'superfluous',
    firstLevel: {
      foo: '42',
      bing: '4',
    },
  }))
  expect(result.toJS()).toMatchSnapshot()
})
