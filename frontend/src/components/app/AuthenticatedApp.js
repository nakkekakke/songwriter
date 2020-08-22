import React, { useEffect } from 'react'
import NavBar from '../nav/NavBar'
import { makeStyles, Container } from '@material-ui/core'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import SongList from '../songs/SongList'
import Song from '../songs/Song'
import { initializeSongs } from '../../redux/songReducer'
import { useDispatch, useSelector } from 'react-redux'

const useStyles = makeStyles(() => ({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  contentContainer: {

  }
}))

const AuthenticatedApp = () => {
  console.log('App rendering')
  //const [open, setOpen] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()

  const user = useSelector((state) => state.auth.user)

  useEffect(() => {
    console.log('App effect')
    dispatch(initializeSongs(user))
  }, [dispatch, user])

  return (
    <>
      <Router>
        <NavBar loggedIn />
        <Container maxWidth={false} className={classes.mainContainer}>
          <Container maxWidth={false} align='center' className={classes.contentContainer}>
            <Switch>
              <Route path='/songs/:id'>
                <Song />
              </Route>
              <Route path='/songs/'>
                <SongList />
              </Route>
              <Route path='/'><p>Welcome</p></Route>
            </Switch>
          </Container>
        </Container>
      </Router>
    </>
  )
}

export default AuthenticatedApp
