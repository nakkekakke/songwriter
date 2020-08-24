import React, { useState } from 'react'
import { makeStyles, TextField, Button, Icon, Box, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import songHelper from '../../helpers/songHelper'
import { useDispatch, useSelector } from 'react-redux'
import { editSection, deleteSection, cloneSection } from '../../redux/songReducer'

import { SortableHandle } from 'react-sortable-hoc'
import { DragIndicator } from '@material-ui/icons'
import { errors, createError, removeError } from '../../redux/errorReducer'

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
  name: {
    marginTop: 10
  },
  linesDiv: {
    marginTop: 12,
    marginBottom: 10
  },
  line: {
    marginBottom: 5
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
  cloneButton: {
    marginTop: 10,
    marginBottom: -25,
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
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  const DragHandle = SortableHandle(() => <Box className={classes.dragHandle}> <Icon><DragIndicator /></Icon> </Box>)

  const section = useSelector((state) => state.songs.find(s => s.id === songId).sections.find(s => s.id === sectionId))
  const nameError = useSelector((state) => state.errors.find(e => e.type === errors.SECTION_NAME_ERROR && e.id === sectionId))
  const lineError = useSelector((state) => state.errors.find(e => e.type === errors.SECTION_LINES_ERROR && e.id === sectionId))

  const editView = () => {
    return (
      <form className={classes.editForm} >
        <TextField
          className={classes.nameField}
          error={nameError !== undefined}
          label='Edit name'
          name='name'
          defaultValue={section.name}
          onChange={handleNameChange}
          helperText={nameError ? 'Length must be 1-50 characters' : ''}
        />
        <div>
          <TextField
            multiline
            error={lineError !== undefined}
            label='Lines'
            name='lines'
            rows={section.lines.size}
            defaultValue={songHelper.linesArrayToString(section.lines)}
            onChange={handleLinesChange}
            fullWidth={true}
            helperText={lineError ? 'Max 200 characters for one line' : ''}
          />
        </div>
        <div className={classes.bottomDiv}>
          <Button
            className={classes.cloneButton}
            size='small'
            color='primary'
            variant='outlined'
            onClick={handleCloneClick}
          >
            Clone
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
        <Typography variant='h6' className={classes.name}>
          {section.name}
        </Typography>
        <div className={classes.linesDiv}>
          {section.lines.map((line, index) => {
            return (
              <div key={index}>
                <Typography variant='body1' className={classes.line}>{line}</Typography>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const handleNameChange = (event) => {
    const name = event.target.value
    const editedSection = { ...section, lines: [...section.lines], name }
    if (name.length === 0 || name.length > 50) {
      dispatch(createError(errors.SECTION_NAME_ERROR, sectionId))
    } else {
      dispatch(removeError(errors.SECTION_NAME_ERROR, sectionId))
    }
    dispatch(editSection(songId, editedSection))
  }

  const handleLinesChange = (event) => {
    const linesArray = songHelper.linesStringToArray(event.target.value)
    const editedSection = { ...section, lines: linesArray }
    if (!songHelper.validateLines(linesArray)) {
      dispatch(createError(errors.SECTION_LINES_ERROR, sectionId))
    } else {
      dispatch(removeError(errors.SECTION_LINES_ERROR, sectionId))
    }
    dispatch(editSection(songId, editedSection))
  }

  const handleCloneClick = () => {
    console.log('Cloning', section)
    dispatch(cloneSection(songId, section))
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