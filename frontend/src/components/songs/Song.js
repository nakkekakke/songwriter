import React, { useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Container, Button, TextField, DialogTitle, DialogContent, DialogContentText, DialogActions, Dialog } from '@material-ui/core'
import { Add, DeleteForever } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { editTitle, addSection, deleteSong, saveSong, getSongFromSnapshot } from '../../redux/songReducer'
import { saveSnapshot, resetSnapshot } from '../../redux/snapshotReducer'
import SongSectionList from './SongSectionList'
import _ from 'lodash'
import UnsavedPrompt from './UnsavedPrompt'
import DialogCloseButton from '../DialogCloseButton'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  menuContainer: {
    marginBottom: theme.spacing(1)
  },
  editModeButton: {
    marginLeft: theme.spacing(1)
  },
  titleField: {
    margin: 15
  },
  addSectionButton: {
    marginTop: theme.spacing(1)
  },
  deleteSongButton: {
    marginLeft: 'auto'
  },
  dialogCloseButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
}))

const Song = () => {
  const [editMode, setEditMode] = useState(false)
  const [delConfirmOpen, setDelConfirmOpen] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [titleError, setTitleError] = useState(false)

  const classes = useStyles()
  const id = useParams().id
  const dispatch = useDispatch()
  const history = useHistory()

  const song = useSelector((state) => state.songs.find(s => s.id === id))

  const snapshot = useSelector((state) => state.snapshot)

  console.log('Song render:', song)

  const renderTitle = () => {
    if (editMode) {
      return (
        <TextField
          error={titleError}
          className={classes.titleField}
          label='Edit title'
          defaultValue={song.title}
          onChange={handleTitleChange}
          helperText={titleError ? 'Title cannot be empty!' : ''} // Todo: enforce
        />
      )
    } else {
      return (
        <h1>{song.title}</h1>
      )
    }
  }

  const saveButton = () => {
    if (unsavedChanges()) {
      return (
        <Button
          color='primary'
          variant='outlined'
          onClick={handleSaveClick}
        >
          Save changes
        </Button>
      )
    }
  }

  const editModeButton = () => {
    return (
      <Button
        color='primary'
        variant='contained'
        onClick={handleEditButtonClick}
        className={classes.editModeButton}
      >
        {editMode ? 'Exit edit mode' : 'Edit mode'}
      </Button>
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
          <DialogCloseButton onClick={() => setSaveOpen(false)} />
        </DialogActions>
      </Dialog>
    )
  }

  const handleSaveClick = () => {
    dispatch(saveSnapshot(song))
    dispatch(saveSong(song))
  }

  const handleEditButtonClick = () => {
    if (editMode) {
      handleEditModeExitClick()
    } else {
      handleEditModeEnterClick()
    }
  }

  const handleEditModeEnterClick = () => {
    dispatch(saveSnapshot(song))
    setEditMode(true)
  }

  const handleEditModeExitClick = () => {
    console.log('Exiting edit mode')
    if (unsavedChanges()) {
      setSaveOpen(true)
    } else {
      setEditMode(false)
      dispatch(resetSnapshot())
    }
  }

  const handleSaveAgreeClick = () => {
    console.log('Saving!')
    setSaveOpen(false)
    setEditMode(false)
    dispatch(resetSnapshot())
    dispatch(saveSong(song))
  }

  const handleSaveDiscardClick = () => {
    console.log('Discarding changes!')
    setSaveOpen(false)
    setEditMode(false)
    dispatch(resetSnapshot())
    dispatch(getSongFromSnapshot(snapshot))
    console.log('Snapshot after reset:', snapshot)
  }

  const handleTitleChange = (event) => {
    if (event.target.value === '') {
      setTitleError(true)
    } else if (titleError) {
      setTitleError(false)
    }
    dispatch(editTitle(song, event.target.value))
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

  const unsavedChanges = () => {
    return !_.isEmpty(snapshot) && !_.isEqual(snapshot, song)
  }

  if (song) {
    return (
      <div className={classes.root}>
        {renderTitle()}
        <div>
          <Container align='right' maxWidth={false} className={classes.menuContainer}>
            {saveButton()}
            {editModeButton()}
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
        <UnsavedPrompt
          handleSaveAgreeClick={handleSaveAgreeClick}
          handleSaveDiscardClick={handleSaveDiscardClick}
          unsavedChanges={unsavedChanges}
        />
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

export default Song