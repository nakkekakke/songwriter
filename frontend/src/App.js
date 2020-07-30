import React, { useState, useEffect } from 'react'
import songService from './services/songService'
import NavBar from './components/NavBar'
import { makeStyles, Container } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SongList from './components/SongList'
import Song from './components/Song'
import SnackbarAlert from './components/SnackbarAlert'

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
        console.log('Got songs!')
      })
      .catch(() => {
        setAlertIsError(true)
        setAlertMessage('Couldn\'t load songs')
      })
  }, [])

  const editSong = (newSong) => {
    let newSongs = JSON.parse(JSON.stringify(songs)) // deep clone
    const songIndex = newSongs.map(s => s.id).indexOf(newSong.id)
    newSongs.splice(songIndex, 1, newSong) // replace old song
    //console.log('Original:', songs)
    //console.log('New:', newSongs)
    setSongs(newSongs)
  }



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
                  songs={songs}
                  setAlertMessage={setAlertMessage}
                  setAlertIsError={setAlertIsError}
                  editSong={editSong}
                />
              </Route>
              <Route path='/songs'>
                <SongList
                  songs={songs}
                />
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
