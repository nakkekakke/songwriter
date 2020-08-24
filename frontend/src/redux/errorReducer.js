export const CREATE_ERROR = 'CREATE_ERROR'
export const REMOVE_ERROR = 'REMOVE_ERROR'

export const errors = {
  SONG_TITLE_ERROR: 'SONG_TITLE_ERROR',
  SECTION_NAME_ERROR: 'SECTION_NAME_ERROR',
  SECTION_LINES_ERROR: 'SECTION_LINES_ERROR'
}

const errorReducer = (state = [], action) => {
  switch (action.type) {
  case CREATE_ERROR:
    return [...state, action.data] // Can create multiples, should be ok for now
  case REMOVE_ERROR: {
    return state.filter(e => !(e.type === action.data.type && e.id === action.data.id)) // Works with null IDs too
  }
  default:
    return state
  }
}

export const createError = (type, id = null) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_ERROR,
      data: { type, id }
    })
  }
}

export const removeError = (type, id = null) => {
  console.log('Type is:', type, 'id is:', id)
  return (dispatch) => {
    dispatch({
      type: REMOVE_ERROR,
      data: { type, id }
    })
  }
}

export default errorReducer