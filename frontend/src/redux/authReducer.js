import authService from '../services/authService'
import { showAlert, alerts } from './alertReducer'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_WITH_TOKEN = 'LOGIN_WITH_TOKEN'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const AUTH_FAILURE = 'AUTH_FAILURE'

const initialState = {
  loginInProgress: false,
  loggedIn: false,
  user: null
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
  case LOGIN_REQUEST:
    return { ...state, loginInProgress: true }
  case LOGIN_SUCCESS:
    return { loginInProgress: false, loggedIn: true, user: action.data }
  case LOGIN_FAILURE:
    return initialState
  case LOGIN_WITH_TOKEN:
    return { loginInProgress: false, loggedIn: true, user: action.data }
  case LOGOUT_SUCCESS:
    return initialState
  case AUTH_FAILURE:
    return initialState
  default:
    return state
  }
}

export const login = (username, password) => {
  console.log('logging in user:', username)
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      data: { username, password }
    })
    try {
      const user = await authService.authenticate(username, password)
      localStorage.setItem('SongWriterUser', JSON.stringify(user))
      dispatch({
        type: LOGIN_SUCCESS,
        data: user
      })
      dispatch(showAlert(alerts.loginSuccess))
    } catch (error) {
      console.log('Login failed')
      dispatch({
        type: LOGIN_FAILURE
      })
      dispatch(showAlert(alerts.loginFailure))
    }
  }
}

export const loginWithToken = (user) => {
  console.log('auto-login for', user)
  return (dispatch) => {
    dispatch({
      type: LOGIN_WITH_TOKEN,
      data: user
    })
  }
}

export const logout = () => {
  localStorage.removeItem('SongWriterUser')
  return (dispatch) => {
    dispatch({
      type: LOGOUT_SUCCESS
    })
  }
}

export const authFailure = () => {
  localStorage.removeItem('SongWriterUser')
  return (dispatch) => {
    dispatch({
      type: AUTH_FAILURE
    })
  }
}

export default authReducer