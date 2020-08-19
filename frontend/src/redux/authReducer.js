import authService from '../services/authService'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const LOGIN_WITH_TOKEN = 'LOGIN_WITH_TOKEN'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'

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
  default:
    return state
  }
}

export const login = (username, password) => {
  console.log('logging in user:', username, 'with password', password)
  return async (dispatch) => {
    dispatch({
      type: LOGIN_REQUEST,
      data: { username, password }
    })
    try {
      const user = await authService.authenticate(username, password)
      console.log('login res:', user)
      localStorage.setItem('SongWriterUser', JSON.stringify(user))
      dispatch({
        type: LOGIN_SUCCESS,
        data: user
      })
    } catch (error) {
      console.log('Login failed')
      dispatch({
        type: LOGIN_FAILURE
      })
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
  console.log('Logging out user')
  localStorage.removeItem('SongWriterUser')
  return (dispatch) => {
    dispatch({
      type: LOGOUT_SUCCESS
    })
  }
}

export default authReducer