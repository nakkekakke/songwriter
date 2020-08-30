import React, { useState } from 'react'
import { makeStyles, TextField, Button, Icon, Box, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import songHelper from '../../../helpers/songHelper'
import { useDispatch, useSelector } from 'react-redux'
import { editSection, deleteSection, cloneSection } from '../../../redux/songReducer'
import { errors, createError, removeError } from '../../../redux/errorReducer'
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
    backgroundColor: theme.palette.background.paper
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

const SongSection = ({ songId, sectionId }) => {
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  const DragHandle = SortableHandle(() => (
    <Box
      className={classes.dragHandle}>
      <Icon>
        <DragIndicator />
      </Icon>
    </Box>
  ))

  const section = useSelector((state) => state.songs.find(s => s.id === songId).sections.find(s => s.id === sectionId))
  const nameError = useSelector((state) => state.errors.find(e => e.type === errors.SECTION_NAME_ERROR && e.id === sectionId))
  const lineError = useSelector((state) => state.errors.find(e => e.type === errors.SECTION_LINES_ERROR && e.id === sectionId))
  const editMode = useSelector((state) => state.statuses.editMode)
  const showChords = useSelector((state) => state.statuses.chords)
  const darkMode = useSelector((state) => state.statuses.darkMode)

  // If tab is pressed, put 4 spaces into the string
  const linesOnKeyDown = (event) => {
    if (event.key === 'Tab' && !event.shiftKey) {
      event.preventDefault()
      const value = event.target.value
      const selectionStart = event.target.selectionStart
      const selectionEnd = event.target.selectionEnd
      event.target.value = value.substring(0, selectionStart) + '    ' + value.substring(selectionEnd)
      event.target.selectionStart = selectionEnd + 4 - (selectionEnd - selectionStart)
      event.target.selectionEnd = selectionEnd + 4 - (selectionEnd - selectionStart)
    }
  }

  const editView = () => {
    return (
      <form className={classes.editForm} >
        <TextField
          label='Edit name'
          name='name'
          onChange={handleNameChange}
          defaultValue={section.name}
          error={nameError !== undefined}
          helperText={nameError ? 'Length must be 1-50 characters' : ''}
          className={classes.nameField}
        />
        <div>
          <TextField
            multiline
            label='Lines'
            name='lines'
            onChange={handleLinesChange}
            onKeyDown={linesOnKeyDown}
            defaultValue={songHelper.linesArrayToString(section.lines)}
            rows={section.lines.size}
            error={lineError !== undefined}
            fullWidth={true}
            helperText={lineError ? 'Max 200 characters for one line' : ''}
          />
        </div>
        <div className={classes.bottomDiv}>
          <Button
            onClick={handleCloneClick}
            size='small'
            color='primary'
            variant={darkMode ? 'contained' : 'outlined'}
            className={classes.cloneButton}
          >
            Clone
          </Button>
          <DragHandle />
          <Button
            onClick={handleDeleteClick}
            size='small'
            color='secondary'
            variant={darkMode ? 'contained' : 'outlined'}
            className={classes.deleteButton}
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
                <Typography variant='body1' className={classes.line}>
                  {showChords ? songHelper.addChordsToLine(line) : lineWithSpaces(line)}
                </Typography>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  const lineWithSpaces = (line) => {
    return line.replace(/ /g, '\u00a0')
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
    if (deleteConfirm) {
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
  sectionId: PropTypes.number.isRequired
}

export default SongSection