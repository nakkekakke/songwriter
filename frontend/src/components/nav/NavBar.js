import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LogoutButton from './LogButton'
import NavButtonsDiv from './NavButtonsDiv'
import PropTypes from 'prop-types'
import DarkModeSwitch from '../DarkModeSwitch'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  title: {
    fontSize: 20,
    paddingRight: 15
  }
}))

const NavBar = ({ loggedIn }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title}>
            SongWriter
          </Typography>
          <NavButtonsDiv loggedIn={loggedIn} />
          <DarkModeSwitch />
          <LogoutButton loggedIn={loggedIn} />
        </Toolbar>
      </AppBar>
    </div>

  )
}

NavBar.propTypes = {
  loggedIn: PropTypes.bool
}

export default NavBar