import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { makeStyles, Container, Button, TextField, FormControlLabel, Switch } from '@material-ui/core'
import { Add, DeleteForever } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { editTitle, addSection, deleteSong, saveSong, getSongFromSnapshot } from '../../redux/songReducer'
import { saveSnapshot, resetSnapshot } from '../../redux/snapshotReducer'
import SongSectionList from './sections/SongSectionList'
import _ from 'lodash'
import UnsavedPrompt from './dialogs/UnsavedPrompt'
import DeleteDialog from './dialogs/DeleteDialog'
import SaveDialog from './dialogs/SaveDialog'
import Heading from '../Heading'
import { errors, createError, removeError } from '../../redux/errorReducer'
import { toggleChords, toggleEditMode, resetSongStatuses } from '../../redux/statusReducer'

const useStyles = makeStyles((theme) => ({
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
    marginBottom: 4
  },
  addSectionButton: {
    marginTop: theme.spacing(1)
  },
  deleteSongButton: {
    marginLeft: 'auto'
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

  const calculateTitleWidth = () => {
    return 5 + (song.title.length / 2.5)
  }

  const title = () => {
    if (editMode) {
      return (
        <div style={{ width: `${calculateTitleWidth()}%` }}>
          <TextField
            label='Edit title'
            onChange={handleTitleChange}
            defaultValue={song.title}
            error={titleError !== undefined}
            helperText={titleError ? 'Length must be 1-50 characters' : ''}
            fullWidth
            className={classes.titleField}
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
          onClick={handleSaveClick}
          color='primary'
          variant={darkMode ? 'contained' : 'outlined'}
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
          control={
            <Switch
              onChange={handleChordsSwitchClick}
              checked={showChords}
              color='primary'
            />
          }
          label='Show chords'
          className={classes.chordToggleSwitch}
        />
      )
    }
  }

  const editModeSwitch = () => {
    return (
      <FormControlLabel
        control={
          <Switch
            onChange={handleEditSwitchClick}
            checked={editMode}
            color='primary'
          />
        }
        label='Edit mode'
        className={classes.editModeSwitch}
      />
    )
  }

  const addSectionButton = () => {
    if (editMode) {
      return (
        <Button
          onClick={handleAddSectionClick}
          variant='contained'
          color='primary'
          startIcon={<Add />}
          className={classes.addSectionButton}
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
          onClick={() => setDelConfirmOpen(true)}
          variant='contained'
          color='secondary'
          startIcon={<DeleteForever />}
          className={classes.deleteSongButton}
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
    if (unsavedChanges()) {
      setSaveOpen(true)
    } else {
      dispatch(toggleEditMode())
      dispatch(resetSnapshot())
    }
  }

  const handleSaveConfirmClick = () => {
    setSaveOpen(false)
    dispatch(toggleEditMode())
    dispatch(resetSnapshot())
    dispatch(saveSong(song))
  }

  const handleSaveDiscardClick = () => {
    setSaveOpen(false)
    dispatch(toggleEditMode())
    dispatch(getSongFromSnapshot(snapshot))
    dispatch(resetSnapshot())
  }

  const handleTitleChange = (event) => {
    if (event.target.value === '' || event.target.value.length > 50) {
      dispatch(createError(errors.SONG_TITLE_ERROR))
    } else if (titleError) {
      dispatch(removeError(errors.SONG_TITLE_ERROR))
    }
    dispatch(editTitle(song, event.target.value))
  }

  const handleAddSectionClick = () => {
    dispatch(addSection(song))
  }

  const handleDeleteConfirmClick = () => {
    dispatch(deleteSong(song))
    dispatch(resetSnapshot())
    history.push('/songs/')
  }

  const unsavedChanges = () => {
    return !_.isEmpty(snapshot) && !_.isEqual(snapshot, song)
  }

  if (song) {
    return (
      <div>
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