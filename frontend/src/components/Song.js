import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Container, Button, TextField, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog } from '@material-ui/core'
import { Add, DeleteForever } from '@material-ui/icons'
import SongSection from './SongSection'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { editTitle, addSection, deleteSong } from '../redux/songReducer'

const useStyles = makeStyles(() => ({
  root: {

  },
  menuContainer: {
    marginBottom: 3
  },
  titleForm: {
    margin: 15
  },
  addSectionButton: {
    marginTop: 8
  },
  deleteSongButton: {
    marginLeft: 'auto'
  }
}))

const Song = ({ setAlertMessage, setAlertIsError }) => {
  const [editMode, setEditMode] = useState(false)
  const [title, setTitle] = useState('')
  const [delConfirmOpen, setDelConfirmOpen] = useState(false)

  const classes = useStyles()
  let id = useParams().id
  const dispatch = useDispatch()
  const history = useHistory()

  const song = useSelector((state) => state.find(s => s.id === Number(id)))

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

  const renderSections = () => {
    if (song.sections.length === 0) {
      return (
        <Container>
          <h2>No sections</h2>
        </Container>
      )
    }
    return (
      <Container maxWidth={false} align='left'>
        {song.sections.map(section => {
          return <SongSection key={section.id} songId={song.id} section={section} editMode={editMode} />
        })}
      </Container>
    )
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
    return (<div/>)
  }

  console.log('Delconfirmopen:', delConfirmOpen)

  const deleteSongButton = () => {
    if (editMode) {
      return (
        <Button
          className={classes.deleteSongButton}
          variant='contained'
          color='secondary'
          startIcon={<DeleteForever />}
          onClick={() => setDelConfirmOpen(true)}
        >
          Delete song
        </Button>
      )
    }
    return (<div/>)
  }

  const deleteDialog = () => {
    return (
      <Dialog
        open={delConfirmOpen}
        onClose={() => setDelConfirmOpen(false)}
      >
        <DialogTitle>Delete this song?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Once deleted, this song cannot be restored.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteAgreeClick} color='secondary' variant='contained'>
            Delete permanently
          </Button>
          <Button onClick={() => setDelConfirmOpen(false)} variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
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

  const handleAddSectionClick = () => {
    console.log('Add new section!')
    dispatch(addSection(song))
  }

  const handleDeleteAgreeClick = () => {
    console.log('Deleting song here')
    dispatch(deleteSong(song))
    history.push('/songs/')
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
          {renderSections()}
        </div>
        <Container maxWidth={false}>
          {addSectionButton()}
        </Container>
        <Container align='right' maxWidth={false}>
          {deleteSongButton()}
        </Container>
        {deleteDialog()}
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