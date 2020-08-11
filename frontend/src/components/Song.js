import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Container, Button, TextField, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog } from '@material-ui/core'
import { Add, DeleteForever } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { editTitle, addSection, deleteSong, saveSong, resetSong } from '../redux/songReducer'
import SongSectionList from './SongSectionList'

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
  const [saveOpen, setSaveOpen] = useState(false)

  const classes = useStyles()
  const id = useParams().id
  const dispatch = useDispatch()
  const history = useHistory()

  const song = useSelector((state) => state.find(s => s.id === id))

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
            Once deleted, this song cannot be restored (not even by discarding changes when exiting Edit Mode).
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

  const saveDialog = () => {
    return (
      <Dialog
        open={saveOpen}
        onClose={() => setSaveOpen(false)}
      >
        <DialogTitle>Save changes?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Save or discard the changes you have made.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveAgreeClick} color='primary' variant='contained'>
            Save changes
          </Button>
          <Button onClick={handleSaveDiscardClick} color='secondary' variant='contained'>
            Discard changes
          </Button>
          <Button onClick={() => setSaveOpen(false)} variant='contained'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const handleEditButtonClick = () => {
    editMode ? handleEditModeExitClick() : setEditMode(true)
  }

  const handleEditModeExitClick = () => {
    console.log('Exiting edit mode')
    setSaveOpen(true)
  }

  const handleSaveAgreeClick = () => {
    console.log('Saving!')
    setSaveOpen(false)
    setEditMode(false)
    dispatch(saveSong(song))
  }

  const handleSaveDiscardClick = () => {
    console.log('Discarding changes!')
    setSaveOpen(false)
    setEditMode(false)
    dispatch(resetSong(song))
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
          <SongSectionList song={song} editMode={editMode} />
        </div>
        <Container maxWidth={false}>
          {addSectionButton()}
        </Container>
        <Container align='right' maxWidth={false}>
          {deleteSongButton()}
        </Container>
        {deleteDialog()}
        {saveDialog()}
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