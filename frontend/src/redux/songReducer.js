import songService from '../services/songService'

const initialState = [
  {
    'id': 1,
    'title': 'Test song',
    'sections': [
      {
        'name': 'Verse 1',
        'lines': [
          'Verse 1 line 1 lyrics.',
          'Verse 1 line 2 lyrics...',
          'Verse 1 line 3 lyrics....',
          'Verse 1 line 4 lyrics!!!!'
        ]
      },
      {
        'name': 'Chorus 1',
        'lines': [
          'Chorus 1 line 1 lyrics..',
          'Chorus 1 line 2 lyrics...',
          'Chorus 1 line 3 lyrics....',
          'Chorus 1 line 4 lyrics!!!!'
        ]
      },
      {
        'name': 'Chorus 2',
        'lines': [
          'Chorus 2 line 1 lyrics..',
          'Chorus 2 line 2 lyrics...',
          'Chorus 2 line 3 lyrics....',
          'Chorus 2 line 4 lyrics!!!!'
        ]
      }
    ]
  },
  {
    'id': 2,
    'title': 'Test song 2',
    'sections': [
      {
        'name': 'Verse 1',
        'lines': [
          'Verse 1 line 1 lyrics.',
          'Verse 1 line 2 lyrics...',
          'Verse 1 line 3 lyrics....',
          'Verse 1 line 4 lyrics!!!!'
        ]
      },
      {
        'name': 'Chorus 1',
        'lines': [
          'Chorus 1 line 1 lyrics..',
          'Chorus 1 line 2 lyrics...',
          'Chorus 1 line 3 lyrics....',
          'Chorus 1 line 4 lyrics!!!!'
        ]
      }
    ]
  }
]


// Action types
export const INIT_SONGS = 'INIT_SONGS'
export const CREATE_SONG = 'CREATE_SONG'
export const EDIT_SONG = 'EDIT_SONG'


// Reducer
const songReducer = (state = [], action) => {
  switch (action.type) {
  case INIT_SONGS:
    return action.data
  case CREATE_SONG:
    return state.concat(action.data)
  case EDIT_SONG: {
    const id = action.data.id
    const songToEdit = state.find(s => s.id === id)
    if (songToEdit) {
      return state.map(song => song.id !== id ? song : action.data)
    }
    console.log('Error in reducer')
    return state
  }
  default:
    console.log('Default in reducer')
    return state
  }
}

// Action creators
export const createSong = (song) => {
  return async (action) => {
    const createdSong = await songService.create(song)
    console.log('Created:', createdSong)
    action({
      type: CREATE_SONG,
      data: song
    })
  }
}

export const editSong = (song) => {
  return async (action) => {
    const editedSong = await songService.edit(song)
    console.log('Edited:', editedSong)
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