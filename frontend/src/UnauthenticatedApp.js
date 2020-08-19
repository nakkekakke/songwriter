import React from 'react'
import NavBar from './components/nav/NavBar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Container, makeStyles } from '@material-ui/core'
import LoginForm from './components/LoginForm'

const useStyles = makeStyles(() => ({
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  contentContainer: {

  }
}))

const UnauthenticatedApp = () => {
  const classes = useStyles()

  return (
    <>
      <Router>
        <NavBar />
        <Container maxWidth={false} className={classes.mainContainer}>
          <Container maxWidth={false} align='center' className={classes.contentContainer}>
            <Switch>
              <Route path='/register'><p>Register page</p></Route>
              <Route path='/'>
                <h1>Login</h1>
                <LoginForm />
              </Route>
            </Switch>
          </Container>
        </Container>
      </Router>
    </>
  )
}

export default UnauthenticatedApp