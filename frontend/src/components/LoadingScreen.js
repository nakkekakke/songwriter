import React from 'react'
import { Container, CircularProgress, makeStyles, Typography } from '@material-ui/core'

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 114 // 64 (navbar) + 20 (container padding) + 30 (login header top margin)
  }
}))

const LoadingScreen = () => {
  const classes = useStyles()
  return (
    <div>
      <Container align='center' className={classes.root}>
        <Typography component='h1' variant='h4'>
          Loading
        </Typography>
        <h1>Loading</h1>
        <CircularProgress size={70} thickness={4}/>
      </Container>
    </div>
  )
}

export default LoadingScreen