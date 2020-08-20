export const SHOW_ALERT = 'SHOW_ALERT'
export const HIDE_ALERT = 'HIDE_ALERT'

const initialState = {
  message: '',
  type: '',
  open: false,
}

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
  case SHOW_ALERT:
    return { ...action.data, open: true }
  case HIDE_ALERT:
    return { ...state, open: false }
  default:
    return state
  }
}

export const showAlert = (message, type) => {
  console.log('Creating alert', message, type)
  return (dispatch) => {
    dispatch({
      type: SHOW_ALERT,
      data: { message, type }
    })
  }
}

export const hideAlert = () => { // EDIT simpler
  console.log('Hiding alert')
  return (dispatch) => {
    dispatch({
      type: HIDE_ALERT
    })
  }
}

export default alertReducer