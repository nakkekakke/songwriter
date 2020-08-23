import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Container, Button, TextField } from '@material-ui/core'
import { Add, DeleteForever } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { editTitle, addSection, deleteSong, saveSong, getSongFromSnapshot } from '../../redux/songReducer'
import { saveSnapshot, resetSnapshot } from '../../redux/snapshotReducer'
import SongSectionList from './SongSectionList'
import _ from 'lodash'
import UnsavedPrompt from './UnsavedPrompt'
import DeleteDialog from './DeleteDialog'
import SaveDialog from './SaveDialog'
import Heading from '../Heading'

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
    margin: 12
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

  useEffect(() => {
    dispatch(resetSnapshot())
  }, [dispatch])

  console.log('Song render:', song)

  const title = () => {
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
        <Heading text={song.title}/>
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

  const handleSaveConfirmClick = () => {
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
    dispatch(getSongFromSnapshot(snapshot))
    dispatch(resetSnapshot())
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

  const handleDeleteConfirmClick = () => {
    console.log('Deleting song here')
    dispatch(deleteSong(song))
    dispatch(resetSnapshot())
    history.push('/songs/')
  }

  const unsavedChanges = () => {
    return !_.isEmpty(snapshot) && !_.isEqual(snapshot, song)
  }

  if (song) {
    return (
      <div className={classes.root}>
        {title()}
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
        <DeleteDialog
          open={delConfirmOpen}
          setOpen={setDelConfirmOpen}
          handleConfirmClick={handleDeleteConfirmClick}
        />
        <SaveDialog
          open={saveOpen}
          setOpen={setSaveOpen}
          handleConfirmClick={handleSaveConfirmClick}
          handleDiscardClick={handleSaveDiscardClick}
        />
        <UnsavedPrompt
          handleSaveConfirmClick={handleSaveConfirmClick}
          handleSaveDiscardClick={handleSaveDiscardClick}
          unsavedChanges={unsavedChanges}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Heading text='Loading song' />
        <p>Check the url if it takes too long</p>
      </div>
    )
  }
}

export default Song