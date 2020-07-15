import React, { useState, useEffect } from 'react'
import songService from './services/songService'
import NavBar from './components/NavBar'
import { Container } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SongList from './components/SongList'
import Song from './components/Song'
import SongForm from './components/SongForm'

const App = () => {
  const [songs, setSongs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    console.log('Effect in effect')
    songService
      .getAll()
      .then(loadedSongs => {
        setSongs(loadedSongs)
      })
      .catch(() => {
        setErrorMessage('Couldn\'t load songs')
      })
  }, [])

  return (
    <>
      <Router>
        <NavBar/>
        <Container maxWidth='xl' className='App'>
          <Switch>
            <Route path='/songs/:id'>
              <Song songs={songs} />
            </Route>
            <Route path='/songs'>
              <SongList songs={songs} errorMessage={errorMessage}/>
            </Route>
            <Route path='/newSong'>
              <SongForm songs={songs} setSongs={setSongs} errorMessage={errorMessage} setErrorMessage={setErrorMessage}/>
            </Route>
            <Route path='/'><p>Welcome</p></Route>
          </Switch>
          
        </Container>
      </Router>
    </>
  )
}

export default App
