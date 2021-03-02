import React, { useEffect } from 'react'
import NavBar from '../nav/NavBar'
import { makeStyles, Container } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SongList from '../songlist/SongList'
import Song from '../songs/Song'
import { initializeSongs } from '../../redux/songReducer'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
}))

const AuthenticatedApp = () => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    dispatch(initializeSongs(user))
  }, [dispatch, user])

  return (
    <>
      <Router>
        <NavBar loggedIn />
        <Container maxWidth={false} className={classes.mainContainer}>
          <Container maxWidth={'lg'} align='center'>
            <Switch>
              <Route path='/songs/:id'>
                <Song />
              </Route>
              <Route path={['/songs/', '/']}>
                <SongList />
              </Route>
            </Switch>
          </Container>
        </Container>
      </Router>
    </>
  )
}

export default AuthenticatedApp
