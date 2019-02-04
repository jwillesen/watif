import Immutable from 'immutable'
import {handleActions} from 'redux-actions'

const reducer = handleActions(
  {
    ADD_LOG_ENTRY: (state, action) => state.push(action.payload),
  },
  Immutable.List()
)

export default reducer
