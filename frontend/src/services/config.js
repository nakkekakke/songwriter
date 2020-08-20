import axios from 'axios'
import store from '../redux/store'
import { authFailure } from '../redux/authReducer'

const instance = axios.create()

instance.interceptors.response.use((res) => {
  return res
}, (error) => {
  if (error.response.status === 401) {
    console.log(error.response.message)
    store.dispatch(authFailure())
  }
  return Promise.reject(error)
})

export default instance