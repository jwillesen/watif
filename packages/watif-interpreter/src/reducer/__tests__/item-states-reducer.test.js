import Immutable from 'immutable'
import rootReducer from '../index'
import reducer from '../item-states-reducer'
import {setItemState} from '../../actions'

// TODO: I'm not sure we can count on jest's snapshot when it comes to unordered Immutable.Map

const DefaultItemStates = rootReducer(undefined, {type: '~~init~~'})
  .get('itemStates')

it('merges item states', () => {
  let nextState = reducer(DefaultItemStates,
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
