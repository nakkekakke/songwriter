import React from 'react'
import { AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import LogoutButton from './LogButton'
import NavButton from './NavButton'
import { useSelector } from 'react-redux'
import NavButtonsDiv from './NavButtonsDiv'

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
          <LogoutButton loggedIn={loggedIn} />
        </Toolbar>
      </AppBar>
    </div>

  )
}

export default NavBar