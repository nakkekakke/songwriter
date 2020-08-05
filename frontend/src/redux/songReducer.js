import songService from '../services/songService'
import songHelper from '../helpers/songHelper'

// Action types
export const INIT_SONGS = 'INIT_SONGS'
export const CREATE_SONG = 'CREATE_SONG'
export const EDIT_SONG = 'EDIT_SONG'
export const ADD_SECTION = 'ADD_SECTION'


// Reducer
const songReducer = (state = [], action) => {
  switch (action.type) {
  case INIT_SONGS:
    return action.data
  case CREATE_SONG: {
    const newState = state.concat(action.data)
    console.log('pushing')
    action.history.push('/' + action.data.id)
    console.log('pushed')
    return newState
  }
  case EDIT_SONG: {
    const id = action.data.id
    return state.map(song => song.id !== id ? song : action.data)
  }
  default:
    console.log('Default in reducer')
    return state
  }
}

// Action creators
export const createSong = (song, history) => {
  console.log('Song to create:', song)
  return async (action) => {
    const createdSong = await songService.create(song)
    console.log('Created:', createdSong)
    action({
      type: CREATE_SONG,
      data: createdSong,
      history: history
    })
  }
}

export const editTitle = (song, title) => {
  let songToSave = JSON.parse(JSON.stringify(song))
  songToSave.title = title

  return async (action) => {
    const editedSong = await songService.edit(songToSave)
    console.log('Edited:', editedSong)
    action({
      type: EDIT_SONG,
      data: editedSong
    })
  }
}

export const editSection = (songId, section) => {
  return async (action) => {
    let songToSave = await songService.getOne(songId)
    songToSave.sections = songToSave.sections.map(s => s.id === section.id ? section : s) // Replace edited section
    console.log('Song to save:', songToSave)
    const editedSong = await songService.edit(songToSave)
    action({
      type: EDIT_SONG,
      data: editedSong
    })
  }
}

export const addSection = (song) => {
  let songToSave = JSON.parse(JSON.stringify(song))
  songToSave = songHelper.addNewSection(songToSave)

  return async (action) => {
    const editedSong = await songService.edit(songToSave)
    action({
      type: EDIT_SONG,
      data: editedSong
    })
  }
}

export const initializeSongs = () => {
  return async (action) => {
    const songs = await songService.getAll()
    console.log('Initialized:', songs)
    action({
      type: INIT_SONGS,
      data: songs
    })
  }
}

export default songReducer