import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/app/App'
import { Provider } from 'react-redux'
import store from './redux/store'


ReactDOM.render(
  //<React.StrictMode> // MAKES EVERYTHING RENDER TWICE!
  <Provider store={store}>
    <App/>
  </Provider>,
  //</React.StrictMode>
  document.getElementById('root')
)
//<App />