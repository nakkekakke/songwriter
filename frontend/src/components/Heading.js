import React from 'react'
import { makeStyles, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  header: {
    marginTop: 30
  }
}))

const Heading = ({ text }) => {
  const classes = useStyles()
  return (
    <Typography component='h1' variant='h4' className={classes.header}>
      {text}
    </Typography>
  )
}

Heading.propTypes = {
  text: PropTypes.string.isRequired
}

export default Heading