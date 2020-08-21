import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, Container, Typography, FormGroup, TextField, Button, Link as MaterialLink } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { showAlert, alerts } from '../redux/alertReducer'
import userService from '../services/userService'

const useStyles = makeStyles(() => ({
  header: {
    marginTop: 30
  },
  form: {
    marginTop: 25,
    marginBottom: 12
  },
  input: {
    marginBottom: 20
  },
  loginButton: {

  },
  linkContainer: {

  }
}))

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const classes = useStyles()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const user = await userService.signup(username, password)
      console.log('Signed up:', user)
      dispatch(showAlert(alerts.signupSuccess))
    } catch (error) {
      dispatch(showAlert(alerts.signupFailure))
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Container maxWidth='xs' align='center' className={classes.contentContainer}>
      <Typography component='h1' variant='h4' className={classes.header}>
        Sign up
      </Typography>
      <form onSubmit={handleSubmit} className={classes.form}>
        <FormGroup>
          <TextField
            required
            variant='outlined'
            name='username'
            label='Username'
            id='username'
            autoFocus
            autoComplete='username'
            onChange={handleUsernameChange}
            className={classes.input}
          />

          <TextField
            required
            variant='outlined'
            name='password'
            label='Password'
            id='password'
            type='password'
            autoComplete='current-password'
            onChange={handlePasswordChange}
            className={classes.input}
          />
          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='medium'
            className={classes.loginButton}
          >
            Sign up
          </Button>
        </FormGroup>
      </form>
      <Container align='left' className={classes.linkContainer}>
        <MaterialLink component={Link} to='/'>Back to login page.</MaterialLink>
      </Container>
    </Container>
  )
}

export default Signup