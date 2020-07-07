import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Song from './components/Song'
import Notification from './components/Notification'
import songService from './services/songService'

const App = () => {
  const [songs, setSongs] = useState([])
  const [newSongTitle, setNewSongTitle] = useState('')
  const [newSongContent, setNewSongContent] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('Effect in effect')
    songService
      .getAll()
      .then(loadedSongs => {
        setSongs(loadedSongs)
      })
      .catch(error => {
        setErrorMessage(`Couldn't load songs`)
      })
  }, [])

  console.log('Rendered', songs.length, 'songs')
  

  const listSongs = () => songs.map(song =>
    <Song 
      key={song.id}
      title={song.title}
      content={song.content}
    />
  )

  const addSong = (event) => {
    event.preventDefault()
    const songObject = {
      title: newSongTitle,
      content: newSongContent
    }

    songService
      .create(songObject)
      .then(createdSong => {
        setSongs(songs.concat(createdSong))
        setNewSongTitle('')
        setNewSongContent('')
      })
      .catch(error => {
        setErrorMessage(`Couldn't add song`)
      })
  }

  const handleSongTitleChange = (event) => {
    console.log(event.target.value)
    setNewSongTitle(event.target.value)
  }

  const handleSongContentChange = (event) => {
    console.log(event.target.value)
    setNewSongContent(event.target.value)
  }

  return (
    <div>
      <h1>Songs</h1>
      
      <Notification message={errorMessage} />
      <ul>
        {listSongs()}
      </ul>
      <form onSubmit={addSong}>
        <p>Enter song title</p>
        <input value={newSongTitle} onChange={handleSongTitleChange} />
        <p>Enter song content</p>
        <input value={newSongContent} onChange={handleSongContentChange} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default App
