export const SAVE_SNAPSHOT = 'SAVE_SNAPSHOT'
export const RESET_SNAPSHOT = 'RESET_SNAPSHOT'

const initialState = {} // Might upgrade to array at some point, maybe store in the database? (like version history)

const snapshotReducer = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_SNAPSHOT:
    return action.data
  case RESET_SNAPSHOT:
    return initialState
  default:
    return state
  }
}

export const saveSnapshot = (song) => {
  console.log('Saving snapshot:', song)
  return (dispatch) => {
    dispatch({
      type: SAVE_SNAPSHOT,
      data: song
    })
  }
}

export const resetSnapshot = () => {
  console.log('Resetting snapshot')
  return (dispatch) => {
    dispatch({
      type: RESET_SNAPSHOT
    })
  }
}

export default snapshotReducer
