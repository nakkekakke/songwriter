import React, { useState, useEffect } from 'react'
import songService from './services/songService'
import NavBar from './components/NavBar'
import { makeStyles, Grid } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SongList from './components/SongList'
import Song from './components/Song'
import SongForm from './components/SongForm'
import SnackbarAlert from './components/SnackbarAlert'

const useStyles = makeStyles(() => ({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1em'
  },
  contentGrid: {

  }
}))

const App = () => {
  const [songs, setSongs] = useState([])
  const [alertMessage, setAlertMessage] = useState('')
  const [alertIsError, setAlertIsError] = useState(false)
  //const [open, setOpen] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    console.log('Effect in effect')
    songService
      .getAll()
      .then(loadedSongs => {
        setSongs(loadedSongs)
      })
      .catch(() => {
        setAlertIsError(true)
        setAlertMessage('Couldn\'t load songs')
      })
  }, [])



  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') return

    setAlertMessage('')
  }

  return (
    <>
      <Router>
        <NavBar/>
        <Grid container className={classes.mainContainer}>
          <Grid item xs={0} sm={2} />
          <Grid item xs={12} sm={8} align='center' className={classes.contentGrid}>
            <Switch>
              <Route path='/songs/:id'>
                <Song songs={songs} />
              </Route>
              <Route path='/songs'>
                <SongList
                  songs={songs}
                />
              </Route>
              <Route path='/newSong'>
                <SongForm
                  songs={songs}
                  setSongs={setSongs}
                  setAlertMessage={setAlertMessage}
                  setAlertIsError={setAlertIsError}
                />
              </Route>
              <Route path='/'><p>Welcome</p></Route>
            </Switch>
          </Grid>
          <SnackbarAlert
            message={alertMessage}
            isError={alertIsError}
            handleClose={handleAlertClose}
          />
          <Grid item xs={0} sm={2} />
        </Grid>
      </Router>
    </>
  )
}

export default App
