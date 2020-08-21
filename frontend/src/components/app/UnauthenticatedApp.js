import React from 'react'
import NavBar from '../nav/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container, makeStyles } from '@material-ui/core'
import Login from '../Login'
import Signup from '../Signup'

const useStyles = makeStyles(() => ({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  }
}))

const UnauthenticatedApp = () => {
  const classes = useStyles()

  return (
    <>
      <Router>
        <NavBar />
        <Container maxWidth='sm' className={classes.mainContainer}>
          <Switch>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/'>
              <Login />
            </Route>
          </Switch>
        </Container>
      </Router>
    </>
  )
}

export default UnauthenticatedApp