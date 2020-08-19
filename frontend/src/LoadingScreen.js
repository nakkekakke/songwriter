import React from 'react'
import { Container, CircularProgress, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 70
  }
}))

const LoadingScreen = () => {
  const classes = useStyles()
  return (
    <div>
      <Container align='center' className={classes.root}>
        <h1>Logging in</h1>
        <CircularProgress size={70} thickness={4}/>
      </Container>
    </div>
  )
}

export default LoadingScreen