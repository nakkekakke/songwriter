import React, { useState, useEffect } from 'react'
import songService from '../services/songService'
import { List, Divider } from '@material-ui/core'
import Notification from './Notification'
import Song from './Song'

const SongList = () => {
  const [songs, setSongs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('Effect in effect')
    songService
      .getAll()
      .then(loadedSongs => {
        setSongs(loadedSongs)
      })
      .catch(() => {
        setErrorMessage('Couldn\'t load songs')
      })
  }, [])

  console.log('Rendered', songs.length, 'songs')

  const listSongs = () => songs.map(song =>
    <div key={song.id} >
      <Song
        title={song.title}
        content={song.content}
      />
      <Divider/>
    </div>
  )
  
  return (
    <>
      <h1>Songs</h1>
      <Notification message={errorMessage} />
      <List>
        {listSongs()}
      </List>
    </>
  )
}

export default SongList