import React from 'react'
import NavButton from './NavButton'
import { makeStyles } from '@material-ui/core'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  root: {
    flex: 1
  }
}))

const NavButtonsDiv = ({ loggedIn }) => {
  const classes = useStyles()

  const loggedInButtons = () => {
    return <NavButton path='/songs/' text='Your songs' />
  }

  const loggedOutButtons = () => {

  }

  return (
    <div className={classes.root}>
      {loggedIn ? loggedInButtons() : loggedOutButtons()}
    </div>
  )
}

NavButtonsDiv.propTypes = {
  loggedIn: PropTypes.bool
}

export default NavButtonsDiv