import React from 'react'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  title: {
    //flex: 1,
    fontSize: '1.5em',
    paddingRight: '1em'
  },
  buttonsDiv: {
    flex: 1
  },
  linkButton: {
    textDecoration: 'none',
    color: 'white',
    padding: '1.5em'
  }
}))

const NavBar = () => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <Typography className={classes.title}>
            SongWriter
          </Typography>
          <div className={classes.buttonsDiv}>
            <Button component={Link} to={'/songs'} color='inherit' className={classes.linkButton}>Your songs</Button>
            <Button component={Link} to={'/songs/new'} color='inherit' className={classes.linkButton}>Create a new song</Button>
          </div>
          <Button color='inherit' className={classes.logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>

  )
}

export default NavBar