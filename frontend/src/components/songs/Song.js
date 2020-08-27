import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Container, Button, TextField, FormControlLabel, Switch } from '@material-ui/core'
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
import { errors, createError, removeError } from '../../redux/errorReducer'
import { toggleChords, toggleEditMode, resetSongStatuses } from '../../redux/statusReducer'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  menuContainer: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    justifyContent: 'flex-end'
  },
  chordToggleSwitch: {
    marginRight: 'auto'
  },
  editModeSwitch: {
    marginLeft: theme.spacing(1)
  },
  titleField: {
    marginTop: 20,
    marginBottom: 3
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
  const [delConfirmOpen, setDelConfirmOpen] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)

  const classes = useStyles()
  const id = useParams().id
  const dispatch = useDispatch()
  const history = useHistory()

  const song = useSelector((state) => state.songs.find(s => s.id === id))
  const songErrors = useSelector((state) => state.errors)
  const titleError = songErrors.find(e => e.type === errors.SONG_TITLE_ERROR)
  const editMode = useSelector((state) => state.statuses.editMode)
  const showChords = useSelector((state) => state.statuses.chords)
  const darkMode = useSelector((state) => state.statuses.darkMode)

  const snapshot = useSelector((state) => state.snapshot)

  useEffect(() => {
    dispatch(resetSnapshot())
    return () => {
      dispatch(resetSongStatuses())
    }
  }, [dispatch])

  console.log('Song render:', song)

  const calculateTitleWidth = () => {
    return 5 + (song.title.length / 2.5)
  }

  const title = () => {
    if (editMode) {
      return (
        <div style={{ width: `${calculateTitleWidth()}%` }}>
          <TextField
            fullWidth
            error={titleError !== undefined}
            className={classes.titleField}
            label='Edit title'
            defaultValue={song.title}
            onChange={handleTitleChange}
            helperText={titleError ? 'Length must be 1-50 characters' : ''}
          />
        </div>
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
          variant={darkMode ? 'contained' : 'outlined'}
          onClick={handleSaveClick}
          disabled={songErrors.length !== 0}
        >
          Save changes
        </Button>
      )
    }
  }

  const chordsSwitch = () => {
    if (!editMode) {
      return (
        <FormControlLabel
          control={<Switch checked={showChords} onChange={handleChordsSwitchClick} color='primary' />}
          label='Show chords'
          className={classes.chordToggleSwitch}
        />
      )
    }
  }

  const editModeSwitch = () => {
    // return (
    //   <Button
    //     color='primary'
    //     variant='contained'
    //     onClick={handleEditButtonClick}
    //     className={classes.editModeButton}
    //   >
    //     {editMode ? 'Exit edit mode' : 'Edit mode'}
    //   </Button>
    // )
    return (
      <FormControlLabel
        control={<Switch checked={editMode} onChange={handleEditSwitchClick} color='primary' />}
        label='Edit mode'
        className={classes.editModeSwitch}
      />
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

  const handleChordsSwitchClick = () => {
    dispatch(toggleChords())
  }

  const handleSaveClick = () => {
    dispatch(saveSnapshot(song))
    dispatch(saveSong(song))
  }

  const handleEditSwitchClick = () => {
    if (editMode) {
      handleEditModeExitClick()
    } else {
      handleEditModeEnterClick()
    }
  }

  const handleEditModeEnterClick = () => {
    dispatch(saveSnapshot(song))
    dispatch(toggleEditMode())
  }

  const handleEditModeExitClick = () => {
    console.log('Exiting edit mode')
    if (unsavedChanges()) {
      setSaveOpen(true)
    } else {
      dispatch(toggleEditMode())
      dispatch(resetSnapshot())
    }
  }

  const handleSaveConfirmClick = () => {
    console.log('Saving!')
    setSaveOpen(false)
    dispatch(toggleEditMode())
    dispatch(resetSnapshot())
    dispatch(saveSong(song))
  }

  const handleSaveDiscardClick = () => {
    console.log('Discarding changes!')
    setSaveOpen(false)
    dispatch(toggleEditMode())
    dispatch(getSongFromSnapshot(snapshot))
    dispatch(resetSnapshot())
  }

  const handleTitleChange = (event) => {
    if (event.target.value === '' || event.target.value.length > 50) {
      console.log('Dispatching error')
      dispatch(createError(errors.SONG_TITLE_ERROR))
    } else if (titleError) {
      console.log('Removing errors')
      dispatch(removeError(errors.SONG_TITLE_ERROR))
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
          <div className={classes.menuContainer}>
            {chordsSwitch()}
            {saveButton()}
            {editModeSwitch()}
          </div>
          <SongSectionList
            song={song}
          />
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
          saveAllowed={songErrors.length === 0}
        />
        <UnsavedPrompt
          handleSaveConfirmClick={handleSaveConfirmClick}
          handleSaveDiscardClick={handleSaveDiscardClick}
          unsavedChanges={unsavedChanges}
          saveAllowed={songErrors.length === 0}
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