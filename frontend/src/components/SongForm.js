import React, { useState } from 'react'
import { FormControl, InputLabel, Input, Button, Grid } from '@material-ui/core'
import songService from '../services/songService'
import { useHistory } from 'react-router-dom'

const SongForm = ({ songs, setSongs, setAlertMessage, setAlertIsError }) => {
  const [newSongTitle, setNewSongTitle] = useState('')
  const [newSongContent, setNewSongContent] = useState('')

  const history = useHistory()

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
        history.push('/songs')
        console.log(createdSong)
        setAlertMessage('Added song: ' + createdSong.title)
        setAlertIsError(false)
      })
      .catch(() => {
        setAlertMessage('Couldn\'t add song')
        setAlertIsError(true)
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
      <h1>Create a song</h1>
      <form onSubmit={addSong}>
        <Grid
          item
          container
          direction='column'
          alignItems='center'
          justify='center'
        >
          <Grid item>
            <FormControl>
              <InputLabel htmlFor='title'>Enter song title</InputLabel>
              <Input id='title' value={newSongTitle} onChange={handleSongTitleChange}></Input>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <InputLabel htmlFor='content'>Enter song content</InputLabel>
              <Input id='content' value={newSongContent} onChange={handleSongContentChange}></Input>
            </FormControl>
          </Grid>
          <Button style={{ marginTop: '1em' }} color='primary' variant='outlined' type='submit'>Submit</Button>
        </Grid>
      </form>
    </div>
  )
}

export default SongForm