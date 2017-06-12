import Immutable from 'immutable'
import logReducer from '../log-reducer'

it('appends logs', () => {
  const nextState = logReducer(Immutable.List(['prior log']),
    {type: 'ADD_LOG_ENTRY', payload: 'example log'}
  )
  expect(nextState.size).toBe(2)
  expect(nextState.get(0)).toBe('prior log')
  expect(nextState.get(1)).toBe('example log')
})
