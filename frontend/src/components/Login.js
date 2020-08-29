import React, { useState } from 'react'
import { TextField, Button, FormGroup, makeStyles, Container, Link as MaterialLink } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authReducer'
import { Link } from 'react-router-dom'
import Heading from './Heading'

const useStyles = makeStyles((theme) => ({
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
  link: {
    color: theme.palette.primary.light
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
    <Container maxWidth='xs' align='center'>
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
          >
            Log in
          </Button>
        </FormGroup>
      </form>
      <Container align='right'>
        <MaterialLink
          component={Link}
          to='/signup'
          className={classes.link}
        >
          Don&apos;t have an account yet? Sign up here.
        </MaterialLink>
      </Container>
    </Container>
  )
}

export default Login