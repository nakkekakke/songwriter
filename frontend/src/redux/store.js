import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import songReducer from './songReducer'
import snapshotReducer from './snapshotReducer'
import authReducer from './authReducer'
import alertReducer from './alertReducer'

const composeEnhancers = composeWithDevTools({ trace: true })

const reducers = combineReducers({
  songs: songReducer,
  snapshot: snapshotReducer,
  auth: authReducer,
  alert: alertReducer
})

const store = createStore(
  reducers,
  composeEnhancers(
    applyMiddleware(thunk)
  )
)

export default store