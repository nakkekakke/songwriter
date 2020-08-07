import React, { useState } from 'react'
import { makeStyles, TextField, Button, Icon, Box, Paper } from '@material-ui/core'
import PropTypes from 'prop-types'
import songHelper from '../helpers/songHelper'
import { useDispatch } from 'react-redux'
import { editSection, deleteSection } from '../redux/songReducer'

import { SortableHandle } from 'react-sortable-hoc'
import { DragIndicator } from '@material-ui/icons'

const useStyles = makeStyles((theme) => ({
  section: {
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    borderColor: theme.palette.primary.main,
    padding: 20,
    marginBottom: 3,
    overflow: 'auto',
    whiteSpace: 'nowrap',
    backgroundColor: '#fff'
  },
  normalViewRoot: {
    marginTop: -12,
    marginBottom: -15
  },
  line: {
    marginTop: -5
  },
  editForm: {
    marginBottom: 15
  },
  nameField: {
    marginBottom: 10
  },
  buttonDiv: {
    display: 'flex'
  },
  lineSubmitButton: {
    marginTop: 10,
    marginBottom: -25
  },
  deleteButton: {
    marginTop: 10,
    marginBottom: -25,
    marginLeft: 'auto'
  },
  dragHandle: {
    marginLeft: 'auto',
    marginTop: 10,
    marginBottom: -25,
  }
}))

const SongSection = ({ songId, section, editMode }) => {


  // Local states for inputs only
  const [name, setName] = useState(section.name)
  const [linesString, setLinesString] = useState(songHelper.linesArrayToString(section.lines)) // Lines are a string while in state
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  const DragHandle = SortableHandle(() => <Box className={classes.dragHandle}> <Icon><DragIndicator /></Icon> </Box>)

  const editView = () => {
    return (
      <form className={classes.editForm} onSubmit={handleEditSubmit}>
        <TextField className={classes.nameField} label='Edit name' name='name' defaultValue={name} onChange={handleNameChange} />
        <div>
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
          <DragHandle />
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
      <div className={classes.normalViewRoot}>
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
    <div className={classes.section}>
      {editMode ? editView() : normalView()}
    </div>
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