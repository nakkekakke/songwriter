import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { CssBaseline } from '@material-ui/core'

ReactDOM.render(
  //<React.StrictMode> // MAKES EVERYTHING RENDER TWICE!
  <CssBaseline>
    <App />
  </CssBaseline>,
  //</React.StrictMode>
  document.getElementById('root')
)
