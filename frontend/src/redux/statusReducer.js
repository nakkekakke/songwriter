export const TOGGLE_EDIT_MODE = 'TOGGLE_EDIT_MODE'
export const TOGGLE_CHORDS = 'TOGGLE_CHORDS'
export const RESET_SONG_STATUSES = 'RESET_SONG_STATUSES'
export const RESET_ALL_STATUSES = 'RESET_ALL_STATUSES'


const initialState = {
  editMode: false,
  chords: true
}

// Statuses aka boolean variables reflecting different UI-only states
const statusReducer = (state = initialState, action) => {
  switch (action.type) {
  case TOGGLE_EDIT_MODE:
    return { ...state, editMode: !state.editMode }
  case TOGGLE_CHORDS:
    return { ...state, chords: !state.chords }
  case RESET_SONG_STATUSES:
    return {
      ...state,
      editMode: initialState.editMode,
      chords: initialState.chords
    }
  case RESET_ALL_STATUSES:
    return initialState
  default:
    return state
  }
}

export const toggleEditMode = () => {
  return {
    type: TOGGLE_EDIT_MODE
  }
}

export const toggleChords = () => {
  return {
    type: TOGGLE_CHORDS
  }
}

export const resetSongStatuses = () => {
  return {
    type: RESET_SONG_STATUSES
  }
}

export const resetAllStatuses = () => {
  return {
    type: RESET_ALL_STATUSES
  }
}

export default statusReducer