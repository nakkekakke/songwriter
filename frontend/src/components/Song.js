import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles, Container, Button, TextField } from '@material-ui/core'
import SongSection from './SongSection'
import PropTypes from 'prop-types'

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
  }
}))

let song = undefined // Outside of Song component because couldn't get setTimeout to work otherwise

const Song = ({ songs, setAlertMessage, setAlertIsError }) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')

  const classes = useStyles()
  const id = useParams().id

  song = songs.find(s => s.id === Number(id))

  setTimeout(() => {
    if (!song) {
      setAlertMessage('Couldn\'t load song')
      setAlertIsError(true)
    }
  }, 5000)

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
    setAlertIsError(false)
    setAlertMessage('Song title changed to: ' + title)
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
      </div>
    )
  } else {
    return (
      <h1>Loading</h1>
    )
  }
}

Song.propTypes = {
  songs: PropTypes.arrayOf(PropTypes.object).isRequired,
  setAlertIsError: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired
}

export default Song