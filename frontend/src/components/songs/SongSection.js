import React, { useState } from 'react'
import { makeStyles, TextField, Button, Icon, Box } from '@material-ui/core'
import PropTypes from 'prop-types'
import songHelper from '../../helpers/songHelper'
import { useDispatch, useSelector } from 'react-redux'
import { editSection, deleteSection } from '../../redux/songReducer'

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
  bottomDiv: {
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

const SongSection = ({ songId, sectionId, editMode }) => {


  // Local states for inputs only
  //const [name, setName] = useState(section.name)
  //const [linesString, setLinesString] = useState(songHelper.linesArrayToString(section.lines)) // Lines are a string while in state
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  const DragHandle = SortableHandle(() => <Box className={classes.dragHandle}> <Icon><DragIndicator /></Icon> </Box>)

  const section = useSelector((state) => state.songs.find(s => s.id === songId).sections.find(s => s.id === sectionId))

  const editView = () => {
    return (
      <form className={classes.editForm} >
        <TextField className={classes.nameField} label='Edit name' name='name' defaultValue={section.name} onChange={handleNameChange} />
        <div>
          <TextField
            multiline
            label='Lines'
            name='lines'
            rows={section.lines.size}
            defaultValue={songHelper.linesArrayToString(section.lines)}
            onChange={handleLinesChange}
            fullWidth={true}
          />
        </div>
        <div className={classes.bottomDiv}>
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

  const handleNameChange = (event) => {
    const editedSection = { ...section, lines: [...section.lines], name: event.target.value }
    dispatch(editSection(songId, editedSection))
  }

  const handleLinesChange = (event) => {
    const linesArray = songHelper.linesStringToArray(event.target.value)
    const editedSection = { ...section, lines: linesArray }
    dispatch(editSection(songId, editedSection))
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
  songId: PropTypes.string.isRequired,
  sectionId: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired
}

export default SongSection