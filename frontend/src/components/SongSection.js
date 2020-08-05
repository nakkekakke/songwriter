import React, { useState } from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import songHelper from '../helpers/songHelper'
import { useDispatch } from 'react-redux'
import { editSection } from '../redux/songReducer'

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
  lineSubmitButton: {
    marginTop: '10px',
    marginBottom: '-15px'
  }
}))

const SongSection = ({ songId, section, editMode }) => {

  const [name, setName] = useState(section.name)
  const [linesString, setLinesString] = useState(songHelper.linesArrayToString(section.lines)) // Lines are a string while in state

  //console.log('Rendering songsection!', section, linesString)

  const classes = useStyles()
  const dispatch = useDispatch()

  const editView = () => {
    return (
      <form className={classes.editForm} onSubmit={handleEditSubmit}>
        <TextField className={classes.nameField} label='Edit name' defaultValue={name} onChange={handleNameChange} />
        <div className={classes.linesFieldDiv}>
          <TextField
            multiline
            label='Lines'
            rows={songHelper.lineCount(linesString)}
            defaultValue={linesString}
            onChange={handleLinesChange}
            fullWidth={true}
          />
        </div>
        <Button
          className={classes.lineSubmitButton}
          size='small'
          color='primary'
          variant='outlined'
          type='submit'
        >
          Save
        </Button>
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
    event.target[1].value = cleanedLines
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