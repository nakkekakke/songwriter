import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles, Container, Button, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import SongSection from './SongSection'
import PropTypes from 'prop-types'
import songHelper from '../helpers/songHelper'

const useStyles = makeStyles(() => ({
  root: {

  },
  menuContainer: {
    marginBottom: '3px'
  },
  menuButton: {
    marginBottom: '15px'
  },
  titleForm: {
    margin: '15px'
  },
  addSectionButton: {
    margin: '8px'
  }
}))

const Song = ({ songs, setAlertMessage, setAlertIsError, editSong }) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [song, setSong] = useState()

  const classes = useStyles()
  const id = useParams().id

  useEffect(() => {
    if (!song) {
      id === 'new' ? setSong(songHelper.getDefaultSong) : setSong(songs.find(s => s.id === Number(id)))
    }
  }, [id, song, songs])

  console.log('Song render:', song)

  const renderTitle = () => {
    if (editMode) {
      return (
        <form onSubmit={handleTitleSubmit} className={classes.titleForm}>
          <TextField label='Edit title' defaultValue={title ? title : song.title} onChange={handleTitleChange} />
        </form>
      )
    } else {
      return (
        <h1>{song.title}</h1>
      )
    }
  }

  const addSectionButton = () => {
    if (editMode) {
      return (
        <Button className={classes.addSectionButton} variant='contained' color='primary' startIcon={<Add />} onClick={handleAddSectionClick}>
          New section
        </Button>
      )
    }
  }

  const handleEditButtonClick = () => {
    editMode ? handleEditModeExit() : setEditMode(true)
  }

  const handleEditModeExit = () => {
    console.log('Save stuff and exit')
    setEditMode(false)
  }

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setTitle(event.target.value)
  }

  const handleTitleSubmit = (event) => {
    event.preventDefault()
    console.log(title)
    const editedSong = JSON.parse(JSON.stringify(song))
    editedSong.title = title
    setSong(editedSong)
    editSong(editedSong)
    setAlertIsError(false)
    setAlertMessage('Song title changed to: ' + title)
  }

  const handleAddSectionClick = (event) => {
    event.preventDefault()
    console.log('Add new section!')
    const editedSong = JSON.parse(JSON.stringify(song)) // deep clone
    songHelper.addNewSection(editedSong) // modifies the song directly
    setSong(editedSong)
    editSong(editedSong)
  }

  if (song) {
    return (
      <div className={classes.root}>
        {renderTitle()}
        <div>
          <Container align='right' maxWidth={false} className={classes.menuContainer}>
            <Button
              color='primary'
              variant='contained'
              onClick={handleEditButtonClick}
            >
              {editMode ? 'Exit edit mode' : 'Edit mode'}
            </Button>
          </Container>
          <Container maxWidth={false} align='left'>
            {song.sections ?
              song.sections.map(section => {
                return <SongSection key={section.name} section={section} editMode={editMode} /> // Section names should be unique
              }) :
              <p>No sections</p>
            }
          </Container>
        </div>
        {addSectionButton()}
      </div>
    )
  } else {
    return (
      <div>
        <h1>Loading</h1>
        <p>Check the url if it takes too long</p>
      </div>
    )
  }
}

Song.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAlertIsError: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired
}

export default Song