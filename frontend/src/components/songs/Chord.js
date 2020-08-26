import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  chord: {
    backgroundColor: '#ccc',
    marginBottom: -20,
    marginLeft: 1,
    marginRight: 1,
    padding: 1,
    paddingLeft: 3,
    paddingRight: 3,
    borderColor: theme.palette.primary.main,
    borderWidth: 2,
    borderStyle: 'solid',
    borderRadius: 5,
    display: 'inline-block',
    fontSize: '85%'
  }
}))

const Chord = ({ chordString }) => {
  const classes = useStyles()

  // TODO: Add a onHover tooltip that shows chord diagram, if possible?
  return (
    <span className={classes.chord}>
      {chordString}
    </span>
  )
}

Chord.propTypes = {
  chordString: PropTypes.string.isRequired
}

export default Chord