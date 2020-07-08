import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Song from './components/Song'
import Notification from './components/Notification'
import songService from './services/songService'

import { List, FormControl, InputLabel, Input, Button, Container, FormGroup, Divider } from '@material-ui/core'

//import * as Styled from './styled'

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
    <>
      <Song 
        key={song.id}
        title={song.title}
        content={song.content}
      />
      <Divider/>
    </>
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
    <Container maxWidth='sm'>
    <div className='App'>
      <h1>Songs</h1>
      
      <Notification message={errorMessage} />
      <List>
        {listSongs()}
      </List>
      <form onSubmit={addSong}>
        <FormGroup row>
          <FormControl>
            <InputLabel htmlFor='title'>Enter song title</InputLabel>
            <Input id='title' value={newSongTitle} onChange={handleSongTitleChange}></Input>
          </FormControl>
        </FormGroup>
        <FormGroup row>
          <FormControl>
            <InputLabel htmlFor='content'>Enter song content</InputLabel>
            <Input id='content' value={newSongContent} onChange={handleSongContentChange}></Input>
          </FormControl>
        </FormGroup>
        <Button style={{marginTop: '1em'}} color='primary' variant='outlined' type='submit'>Submit</Button>
      </form>
    </div>
    </Container>
  )
}

export default App
