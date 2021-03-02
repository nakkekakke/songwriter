import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, Container, FormGroup, TextField, Button, Link as MaterialLink, Collapse } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Link } from 'react-router-dom'
import { signup } from '../redux/authReducer'
import Heading from './Heading'

const useStyles = makeStyles((theme) => ({
  alert: {
    marginBottom: 10
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

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ username: '', password: '' })
  const [collapseOpen, setCollapseOpen] = useState(false)

  const dispatch = useDispatch()
  const classes = useStyles()

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      dispatch(signup(username, password))
    } catch (error) {
      setCollapseOpen(true)
      setTimeout(() => setCollapseOpen(false), 3000)
    }
  }

  const uniqueAlert = () => {
    return (
      <Collapse in={collapseOpen}>
        <Alert
          severity='error'
          variant='filled'
          className={classes.alert}
        >
          Username already taken!
        </Alert>
      </Collapse>
    )
  }

  const validateUsername = (username) => {
    if (username.length < 3 || username.length > 50) {
      setErrors({ ...errors, username: 'Username length must be 3-50 characters' })
    } else {
      setErrors({ ...errors, username: '' })
    }
  }

  const validatePassword = (password) => {
    if (password.length < 5 || password.length > 50) {
      setErrors({ ...errors, password: 'Password length must be 5-50 characters' })
    } else {
      setErrors({ ...errors, password: '' })
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
    validateUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
    validatePassword(event.target.value)
  }

  return (
    <Container maxWidth='xs' align='center'>
      <Heading text='Sign up'/>
      <form
        onSubmit={handleSubmit}
        autoComplete='off'
        className={classes.form}
      >
        <FormGroup>
          {uniqueAlert()}
          <TextField
            required
            variant='outlined'
            name='username'
            label='Username'
            id='username'
            autoFocus
            autoComplete='username'
            onChange={handleUsernameChange}
            error={errors.username !== ''}
            helperText={errors.username}
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
            error={errors.password !== ''}
            helperText={errors.password}
            className={classes.input}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='medium'
            disabled={errors.password !== '' || errors.username !== ''}
          >
            Sign up
          </Button>
        </FormGroup>
      </form>
      <Container align='left'>
        <MaterialLink
          component={Link}
          to='/'
          className={classes.link}
        >
          Back to login page.
        </MaterialLink>
      </Container>
    </Container>
  )
}

export default Signup