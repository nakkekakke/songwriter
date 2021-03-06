import React from 'react'
import { Button, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  navButton: {
    textDecoration: 'none',
    color: 'white',
    padding: 20
  }
}))

const NavButton = ({ path, text, onClick }) => {
  const classes = useStyles()

  return (
    <Button
      component={Link}
      to={path}
      onClick={onClick}
      color='inherit'
      className={classes.navButton}
    >
      {text}
    </Button>
  )
}

NavButton.propTypes = {
  path: PropTypes.string,
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func
}

export default NavButton