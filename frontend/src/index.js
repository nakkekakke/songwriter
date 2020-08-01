import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { CssBaseline } from '@material-ui/core'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import songReducer from './redux/songReducer'

const store = createStore(songReducer)

ReactDOM.render(
  //<React.StrictMode> // MAKES EVERYTHING RENDER TWICE!
  <CssBaseline>
    <Provider store={store}>
      <App />
    </Provider>
  </CssBaseline>,
  //</React.StrictMode>
  document.getElementById('root')
)
