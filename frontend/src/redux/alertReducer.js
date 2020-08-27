export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'

export const alerts = {
  authFailure: { message: 'Authentication failed. Please log in again.', type: 'error' },
  authSuccess: { message: 'Authentication succeeded.', type: 'success' },
  loginSuccess: { message: 'Logged in.', type: 'success' },
  loginFailure: { message: 'Invalid credentials.', type: 'error' },
  welcome: { message: 'Welcome!', type: 'success' },
  songCreated: { message: 'Song created.', type: 'success' },
  songSaved: { message: 'Song saved.', type: 'success' },
  logout: { message: 'Logged out.', type: 'success' },
  signupSuccess: { message: 'Signup successful! You can now log in.', type: 'success' },
  signupFailure: { message: 'Username is already taken!', type: 'error' },
  validationFailure: { message: 'Saving failed due to invalid input data.', type: 'error' },
  serverFailure: { message: 'Error communicating with the server. Check your internet connection and try again.', type: 'error' },
  dataDesync: { message: 'Local data differs from server data. Please refresh the page.', type: 'error' }
}

const initialState = {
  message: '',
  type: '',
  open: false,
}

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
  case SHOW_ALERT:
    console.log('Alert reducer show', { ...action.data, open: true })
    return { ...action.data, open: true }
  case HIDE_ALERT:
    console.log('Alert reducer hide')
    return { ...state, open: false }
  default:
    return state
  }
}

export const showAlert = (alert) => {
  return {
    type: SHOW_ALERT,
    data: { ...alert }
  }
}

export const hideAlert = () => { // EDIT simpler
  return {
    type: HIDE_ALERT
  }
}

export default alertReducer