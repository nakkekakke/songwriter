import React, { useState, useEffect } from 'react'
import axios from 'axios'
import songService from './services/songService'
import Song from './components/Song'
import Notification from './components/Notification'
import NavBar from './components/NavBar'
import { List, FormControl, InputLabel, Input, Button, Container, FormGroup, Divider } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SongList from './components/SongList'

const App = () => {
  const [songs, setSongs] = useState([])
  const [newSongTitle, setNewSongTitle] = useState('')
  const [newSongContent, setNewSongContent] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

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
      .catch(() => {
        setErrorMessage('Couldn\'t add song')
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
    <>
      <Router>
        <NavBar/>
        <Container maxWidth='xl' className='App'>
          <Notification message={errorMessage} />
          <Switch>
            
            <Route path='/songs'>
              <SongList/>
            </Route>
            <Route path='/'><p>Welcome</p></Route>
          </Switch>
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
        </Container>
      </Router>
    </>
  )
}

export default App
