import React, { useState } from 'react'
import { makeStyles, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'

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
  line: {

  },
  nameForm: {
    marginBottom: '17px'
  },
  linesForm: {

  }
}))

const SongSection = ({ section, editMode }) => {
  const [name, setName] = useState(section.name)
  const [lines, setLines] = useState(section.lines)

  const classes = useStyles()

  const renderName = () => {
    if (editMode) {
      return (
        <form onSubmit={handleNameSubmit} className={classes.nameForm}>
          <TextField label='Edit name' defaultValue={name} onChange={handleNameChange} />
        </form>
      )
    }
    return (
      <h2>{section.name}</h2>
    )
  }

  const listLines = () => {  // TODO
    if (editMode) {
      return (
        <form className={classes.linesForm}>
          <TextField
            multiline
            label='Lines'
            rows={section.lines.length}
            defaultValue={linesToString()}
          />
        </form>
      )
    }
    return section.lines.map((line, index) => {
      return <p className={classes.line} key={index}>{line}</p>
    })
  }

  const linesToString = () => {   // Helper function, move somewhere
    let string = ''
    for (let i = 0; i < lines.length; i++) {
      string = string.concat(lines[i])
      if (i + 1 < lines.length) {  // If it's not the last line, add a newline
        string = string.concat('\n')
      }
      console.log('LinesToString: ', string)
    }
    return string
  }

  const handleNameSubmit = (event) => {
    event.preventDefault()
    console.log(name)
    // setAlertIsError(false)
    // setAlertMessage('Song title changed to: ' + newTitle)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setName(event.target.value)
  }

  return (
    <>
      <div className={classes.section}>
        {renderName()}
        {listLines()}
      </div>
    </>
  )
}

SongSection.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string,
    lines: PropTypes.arrayOf(PropTypes.string)
  }).isRequired,
  editMode: PropTypes.bool.isRequired
}

export default SongSection