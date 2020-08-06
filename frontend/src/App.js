import React, { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import { makeStyles, Container } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SongList from './components/SongList'
import Song from './components/Song'
import SnackbarAlert from './components/SnackbarAlert'
import { initializeSongs } from './redux/songReducer'
import { useDispatch } from 'react-redux'

const useStyles = makeStyles(() => ({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em'
  },
  contentContainer: {

  }
}))

const App = () => {
  console.log('App render')
  const [alertMessage, setAlertMessage] = useState('')
  const [alertIsError, setAlertIsError] = useState(false)
  //const [open, setOpen] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('App effect')
    dispatch(initializeSongs())
  }, [dispatch])

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return

    setAlertMessage('')
  }

  return (
    <>
      <Router>
        <NavBar/>
        <Container maxWidth={false} className={classes.mainContainer}>
          <Container maxWidth={false} align='center' className={classes.contentContainer}>
            <Switch>
              <Route path='/songs/:id'>
                <Song
                  setAlertMessage={setAlertMessage}
                  setAlertIsError={setAlertIsError}
                />
              </Route>
              <Route path='/songs/'>
                <SongList/>
              </Route>
              <Route path='/'><p>Welcome</p></Route>
            </Switch>
          </Container>
          <SnackbarAlert
            message={alertMessage}
            isError={alertIsError}
            handleClose={handleAlertClose}
          />
        </Container>
      </Router>
    </>
  )
}

export default App
