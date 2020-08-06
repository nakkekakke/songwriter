import songService from '../services/songService'
import songHelper from '../helpers/songHelper'

// Action types
export const INIT_SONGS = 'INIT_SONGS'
export const CREATE_SONG = 'CREATE_SONG'
export const EDIT_SONG = 'EDIT_SONG'
export const ADD_SECTION = 'ADD_SECTION'
export const DELETE_SONG = 'DELETE_SONG'


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
  default:
    console.log('Default in reducer')
    return state
  }
}

// Action creators & thunks
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
  let songToSave = JSON.parse(JSON.stringify(song))
  songToSave.title = title

  return async (dispatch) => {
    try {
      const editedSong = await songService.edit(songToSave)
      console.log('Edited:', editedSong)
      dispatch({
        type: EDIT_SONG,
        data: editedSong
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const editSection = (songId, section) => {
  return async (dispatch) => {
    try {
      let songToSave = await songService.getOne(songId)
      songToSave.sections = songToSave.sections.map(s => s.id === section.id ? section : s) // Replace edited section
      console.log('Song to save:', songToSave)
      const editedSong = await songService.edit(songToSave)
      dispatch({
        type: EDIT_SONG,
        data: editedSong
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteSection = (songId, section) => {
  return async (dispatch) => {
    try {
      let songToSave = await songService.getOne(songId)
      songToSave.sections = songToSave.sections.filter(s => s.id !== section.id)
      console.log('Song to save:', songToSave)
      const editedSong = await songService.edit(songToSave)
      dispatch({
        type: EDIT_SONG,
        data: editedSong
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const addSection = (song) => {
  let songToSave = JSON.parse(JSON.stringify(song))
  songToSave = songHelper.addNewSection(songToSave)

  return async (dispatch) => {
    try {
      const editedSong = await songService.edit(songToSave)
      dispatch({
        type: EDIT_SONG,
        data: editedSong
      })
    } catch (error) {
      console.log(error)
    }
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

export default songReducer