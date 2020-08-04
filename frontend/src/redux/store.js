import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import songReducer from './songReducer'

const store = createStore(
  songReducer,
  composeWithDevTools(
    applyMiddleware(thunk)
  )
)

export default store