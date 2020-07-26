import React from 'react'
import { makeStyles } from '@material-ui/core'
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

  }
}))

const SongSection = ({ section }) => {
  const classes = useStyles()

  const listLines = () => {
    return section.lines.map((line, index) => {
      return <p className={classes.line} key={index}>{line}</p>
    })
  }

  return (
    <>
      <div className={classes.section}>
        <h2>{section.name}</h2>
        {listLines()}
      </div>
    </>
  )
}

SongSection.propTypes = {
  section: PropTypes.shape({
    name: PropTypes.string,
    lines: PropTypes.arrayOf(PropTypes.string)
  })
}

export default SongSection