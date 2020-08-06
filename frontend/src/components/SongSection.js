import React, { useState } from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import songHelper from '../helpers/songHelper'
import { useDispatch } from 'react-redux'
import { editSection, deleteSection } from '../redux/songReducer'

const useStyles = makeStyles((theme) => ({
  section: {
    borderWidth: '2px',
    borderStyle: 'solid',
    borderRadius: '5px',
    borderColor: theme.palette.primary.main,
    padding: '1em',
    marginBottom: '3px',
    overflow: 'auto',
    whiteSpace: 'nowrap'
  },
  editForm: {
    marginBottom: '17px'
  },
  nameField: {
    marginBottom: '5px'
  },
  linesFieldDiv: {
    marginRight: '1em'
  },
  buttonDiv: {
    display: 'flex'
  },
  lineSubmitButton: {
    marginTop: '10px',
    marginBottom: '-20px',
  },
  deleteButton: {
    marginTop: '10px',
    marginBottom: '-20px',
    marginLeft: 'auto'
  }
}))

const SongSection = ({ songId, section, editMode }) => {

  // Local states for inputs only
  const [name, setName] = useState(section.name)
  const [linesString, setLinesString] = useState(songHelper.linesArrayToString(section.lines)) // Lines are a string while in state
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  const editView = () => {
    return (
      <form className={classes.editForm} onSubmit={handleEditSubmit}>
        <TextField className={classes.nameField} label='Edit name' name='name' defaultValue={name} onChange={handleNameChange} />
        <div className={classes.linesFieldDiv}>
          <TextField
            multiline
            label='Lines'
            name='lines'
            rows={songHelper.lineCount(linesString)}
            defaultValue={linesString}
            onChange={handleLinesChange}
            fullWidth={true}
          />
        </div>
        <div className={classes.buttonDiv}>
          <Button
            className={classes.lineSubmitButton}
            size='small'
            color='primary'
            variant='outlined'
            type='submit'
          >
            Save
          </Button>
          <Button
            className={classes.deleteButton}
            size='small'
            color='secondary'
            variant='outlined'
            onClick={handleDeleteClick}
          >
            {deleteConfirm ? 'Confirm deletion' : 'Delete'}
          </Button>
        </div>
      </form>
    )
  }

  const normalView = () => {
    return (
      <div>
        <h2>{section.name}</h2>
        {section.lines.map((line, index) => {
          return <p className={classes.line} key={index}>{line}</p>
        })}
      </div>
    )
  }

  const handleEditSubmit = (event) => {
    event.preventDefault()
    console.log('Submitting name:', name)

    const linesArray = songHelper.linesStringToArray(linesString)

    const editedSection = { id: section.id, name: name, lines: linesArray }
    dispatch(editSection(songId, editedSection))

    const cleanedLines = songHelper.linesArrayToString(linesArray)
    event.target.lines.value = cleanedLines
    setLinesString(cleanedLines)
    //setAlertIsError(false)
    //setAlertMessage('Song edited')
  }

  const handleNameChange = (event) => {
    setName(event.target.value)
  }

  const handleLinesChange = (event) => {
    setLinesString(event.target.value)
  }

  const handleDeleteClick = (event) => {
    event.preventDefault()
    console.log('Delete button pressed!')
    if (deleteConfirm) {
      console.log('Delete for realz')
      dispatch(deleteSection(songId, section))
    } else {
      setDeleteConfirm(true)
    }
  }

  return (
    <>
      <div className={classes.section}>
        {editMode ? editView() : normalView()}
      </div>
    </>
  )
}

SongSection.propTypes = {
  songId: PropTypes.number.isRequired,
  section: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    lines: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  editMode: PropTypes.bool.isRequired
}

export default SongSection