import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeStyles, Container, FormGroup, TextField, Button, Link as MaterialLink, Collapse } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { Link, useHistory } from 'react-router-dom'
import { showAlert, alerts } from '../redux/alertReducer'
import userService from '../services/userService'
import Heading from './Heading'

const useStyles = makeStyles(() => ({
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
  loginButton: {

  },
  linkContainer: {

  }
}))

const Signup = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({ username: '', password: '' })
  const [collapseOpen, setCollapseOpen] = useState(false)

  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const user = await userService.create(username, password)
      console.log('Signed up:', user)
      dispatch(showAlert(alerts.signupSuccess))
      history.push('/')
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
    <Container maxWidth='xs' align='center' className={classes.contentContainer}>
      <Heading text='Sign up'/>
      <form onSubmit={handleSubmit} className={classes.form} autoComplete='off'>
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
            className={classes.input}
            error={errors.username !== ''}
            helperText={errors.username}
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
            error={errors.password !== ''}
            helperText={errors.password}
          />

          <Button
            type='submit'
            variant='contained'
            color='primary'
            size='medium'
            className={classes.loginButton}
            disabled={errors.password !== '' || errors.username !== ''}
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