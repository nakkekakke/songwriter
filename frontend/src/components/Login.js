import React, { useState } from 'react'
import { TextField, Button, FormGroup, makeStyles, Container, Link as MaterialLink, Typography } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authReducer'
import { Link } from 'react-router-dom'
import Heading from './Heading'

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

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const classes = useStyles()

  const handleSubmit = async (event) => {
    event.preventDefault()
    dispatch(login(username, password))
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <Container maxWidth='xs' align='center' className={classes.contentContainer}>
      <Heading text='Log in'/>
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
            Login
          </Button>
        </FormGroup>
      </form>
      <Container align='right' className={classes.linkContainer}>
        <MaterialLink component={Link} to='/signup'>Don&apos;t have an account yet? Sign up here.</MaterialLink>
      </Container>
    </Container>
  )
}

export default Login