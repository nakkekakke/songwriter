import axios from 'axios'
import store from '../redux/store'
import { authFailure } from '../redux/authReducer'
import { showAlert, alerts } from '../redux/alertReducer'

const instance = axios.create()

instance.interceptors.response.use((res) => {
  return res
}, (error) => {
  if (error.response.status === 401) {
    console.log(error.response.message)
    store.dispatch(authFailure())
    store.dispatch(showAlert(alerts.authFailure))
  } else if (error.response.status === 500) {
    console.log(error.response.message)
    store.dispatch(showAlert(alerts.serverFailure))
  }
  return Promise.reject(error.message)
})

export default instance