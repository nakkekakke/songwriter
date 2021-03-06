import songService from '../services/songService'
import songHelper from '../helpers/songHelper'
import { showAlert, alerts } from './alertReducer'

// Action types
export const INIT_SONGS = 'INIT_SONGS'
export const CREATE_SONG = 'CREATE_SONG'
export const EDIT_SONG = 'EDIT_SONG'
export const ADD_SECTION = 'ADD_SECTION'
export const DELETE_SONG = 'DELETE_SONG'
export const EDIT_SECTION = 'EDIT_SECTION'
export const DELETE_SECTION = 'DELETE_SECTION'
export const CLONE_SECTION = 'CLONE_SECTION'
export const SORT_SONGS = 'SORT_SONGS'


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
  case SORT_SONGS:
    return action.data
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
  case CLONE_SECTION: {
    const songId = action.data.songId
    const sectionId = action.data.section.id
    const song = state.find(s => s.id === songId)
    const section = song.sections.find(s => s.id === sectionId)
    const newSong = songHelper.cloneAndAddSection(song, section) // Does not mutate
    return state.map(s => s.id !== songId ? s : newSong)
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

export const cloneSong = (song, username) => {
  const rawClone = {
    title: song.title,
    sections: [...song.sections],
    username: username
  }
  return createSong(rawClone)
}

export const editTitle = (song, title) => {
  let songToDispatch = JSON.parse(JSON.stringify(song))
  songToDispatch.title = title

  return {
    type: EDIT_SONG,
    data: songToDispatch
  }
}

export const initializeSongs = (user) => {
  return async (dispatch) => {
    try {
      const songs = await songService.getAll(user)
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
      await songService.destroy(song.id)
      dispatch({
        type: DELETE_SONG,
        data: song
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const sortSongs = (sortedSongs) => {
  return {
    type: SORT_SONGS,
    data: sortedSongs
  }
}

export const saveSong = (song) => {
  return async (dispatch) => {
    try {
      await songService.edit(song)
    } catch (error) {
      dispatch(showAlert(alerts.validationFailure))
    }
  }
}

export const getSongFromSnapshot = (snapshot) => {
  return {
    type: EDIT_SONG,
    data: snapshot
  }
}

// Section action creators
export const editSection = (songId, section) => {
  return {
    type: EDIT_SECTION,
    data: { songId, section }
  }
}

export const deleteSection = (songId, section) => {
  return {
    type: DELETE_SECTION,
    data: { songId, section }
  }
}

export const addSection = (song) => {
  let songToDispatch = JSON.parse(JSON.stringify(song))
  songToDispatch = songHelper.addNewSection(songToDispatch)

  return {
    type: EDIT_SONG,
    data: songToDispatch
  }
}

export const cloneSection = (songId, section) => {
  return {
    type: CLONE_SECTION,
    data: { songId, section }
  }
}

export const sortSections = (song, sortedSections) => {
  let songToDispatch = JSON.parse(JSON.stringify(song))
  songToDispatch.sections = sortedSections

  return {
    type: EDIT_SONG,
    data: songToDispatch
  }
}

export default songReducer