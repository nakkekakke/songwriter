import React from 'react'
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    fontSize: '1.5em'
  },
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
          <Button color='inherit'>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
    
  )
}

export default NavBar