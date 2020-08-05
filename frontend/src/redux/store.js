import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import songReducer from './songReducer'

const composeEnhancers = composeWithDevTools({ trace: true })

const store = createStore(
  songReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store