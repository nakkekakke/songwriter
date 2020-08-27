import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/App'
import { CssBaseline } from '@material-ui/core'
import { Provider } from 'react-redux'
import store from './redux/store'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'


ReactDOM.render(
  //<React.StrictMode> // MAKES EVERYTHING RENDER TWICE!
  <Provider store={store}>
    <App/>
  </Provider>,
  //</React.StrictMode>
  document.getElementById('root')
)
//<App />