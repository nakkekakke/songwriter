import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Container, Button, TextField } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import SongSection from './SongSection'
import PropTypes from 'prop-types'
import songHelper from '../helpers/songHelper'
import { useDispatch, useSelector } from 'react-redux'
import { createSong, editTitle, addSection } from '../redux/songReducer'

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

const Song = ({ setAlertMessage, setAlertIsError }) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')

  const classes = useStyles()
  let id = useParams().id
  const dispatch = useDispatch()
  const history = useHistory()

  let song = useSelector((state) => {
    if (id !== 'new') {
      return state.find(s => s.id === Number(id))
    }
  })

  useEffect(() => {
    if (id === 'new') {
      dispatch(createSong(songHelper.getDefaultSong())) // Note: not error handling createSong
        .then(res => {
          history.push('/songs/' + res.id)
          console.log('Redirected!')
        })
        .catch(e => console.log('Error creating new song:', e))
    }
  }, [id, dispatch, history, song])


  console.log('Song render:', song)

  const renderTitle = () => {
    if (editMode) {
      return (
        <form onSubmit={handleTitleSubmit} className={classes.titleForm}>
          <TextField
            label='Edit title'
            defaultValue={title ? title : song.title}
            onChange={handleTitleChange}
          />
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
        <Button
          className={classes.addSectionButton}
          variant='contained'
          color='primary'
          startIcon={<Add />}
          onClick={handleAddSectionClick}
        >
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
    dispatch(editTitle(song, title))
    setAlertIsError(false)
    setAlertMessage('Song title changed to: ' + title)
  }

  const handleAddSectionClick = (event) => {
    event.preventDefault()
    console.log('Add new section!')
    dispatch(addSection(song))
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
                return <SongSection key={section.id} songId={song.id} section={section} editMode={editMode} />
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
  setAlertIsError: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired
}

export default Song