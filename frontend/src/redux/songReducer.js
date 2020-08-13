import songService from '../services/songService'
import songHelper from '../helpers/songHelper'

// Action types
export const INIT_SONGS = 'INIT_SONGS'
export const CREATE_SONG = 'CREATE_SONG'
export const EDIT_SONG = 'EDIT_SONG'
export const ADD_SECTION = 'ADD_SECTION'
export const DELETE_SONG = 'DELETE_SONG'
export const EDIT_SECTION = 'EDIT_SECTION'
export const DELETE_SECTION = 'DELETE_SECTION'


// Reducer
const songReducer = (state = [], action) => {
  switch (action.type) {
  case INIT_SONGS:
    return action.data
  case CREATE_SONG: {
    const newState = state.concat(action.data)
    return newState
  }
  case EDIT_SONG: {
    const id = action.data.id
    return state.map(song => song.id !== id ? song : action.data)
  }
  case DELETE_SONG:
    return state.filter(song => song.id !== action.data.id)
  case EDIT_SECTION: {
    const songId = action.data.songId
    const sectionId = action.data.section.id
    const song = state.find(s => s.id === songId)
    const editedSections = song.sections.map(section => section.id !== sectionId ? section : action.data.section)
    return state.map(s => s.id !== songId ? s : { ...song, sections: editedSections })
  }
  case DELETE_SECTION: {
    const songId = action.data.songId
    const sectionId = action.data.section.id
    const song = state.find(s => s.id === songId)
    const editedSections = song.sections.filter(section => section.id !== sectionId)
    return state.map(s => s.id !== songId ? s : { ...song, sections: editedSections })
  }
  default:
    return state
  }
}

// Song action creators
export const createSong = (song) => {
  return async (dispatch) => {
    try {
      const createdSong = await songService.create(song)
      console.log('Created:', createdSong)
      dispatch({
        type: CREATE_SONG,
        data: createdSong
      })
      return createdSong
    } catch (error) {
      console.log(error)
    }
  }
}

export const editTitle = (song, title) => {
  let songToDispatch = JSON.parse(JSON.stringify(song))
  songToDispatch.title = title

  return async (dispatch) => {
    dispatch({
      type: EDIT_SONG,
      data: songToDispatch
    })
  }
}


export const initializeSongs = () => {
  return async (dispatch) => {
    try {
      const songs = await songService.getAll()
      console.log('Initialized:', songs)
      dispatch({
        type: INIT_SONGS,
        data: songs
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteSong = (song) => {
  return async (dispatch) => {
    try {
      const returnValue = await songService.destroy(song.id)
      console.log('Destroy returned:', returnValue)
      dispatch({
        type: DELETE_SONG,
        data: song
      })
    } catch (error) {
      console.log(error)
    }
  }
}

// Section action creators
export const editSection = (songId, section) => {
  return async (dispatch) => {
    dispatch({
      type: EDIT_SECTION,
      data: { songId, section }
    })
  }
}

export const deleteSection = (songId, section) => {
  return async (dispatch) => {
    dispatch({
      type: DELETE_SECTION,
      data: { songId, section }
    })
  }
}

export const addSection = (song) => {
  let songToDispatch = JSON.parse(JSON.stringify(song))
  songToDispatch = songHelper.addNewSection(songToDispatch)

  return async (dispatch) => {
    dispatch({
      type: EDIT_SONG,
      data: songToDispatch
    })
  }
}

export const sortSections = (song, sortedSections) => {
  let songToDispatch = JSON.parse(JSON.stringify(song))
  songToDispatch.sections = sortedSections

  return async (dispatch) => {
    dispatch({
      type: EDIT_SONG,
      data: songToDispatch
    })
  }
}

export const saveSong = (song) => {
  return async (dispatch) => {
    try {
      const savedSong = await songService.edit(song)
      dispatch({
        type: EDIT_SONG,
        data: savedSong
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const getSongFromSnapshot = (snapshot) => {
  return async (dispatch) => {
    dispatch({
      type: EDIT_SONG,
      data: snapshot
    })
  }
}

export default songReducer