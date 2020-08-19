import React, { useState } from 'react'
import { TextField, Button, FormGroup } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { login } from '../redux/authReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('Submitting haha', username, password)
    dispatch(login(username, password))
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormGroup>
        <TextField
          required
          name='username'
          label='Username'
          id='username'
          autoFocus
          onChange={handleUsernameChange}
        />

        <TextField
          required
          name='password'
          label='Password'
          id='password'
          type='password'
          onChange={handlePasswordChange}
        />

        <Button
          type='submit'
          variant='contained'
          color='primary'
        >
          Login
        </Button>
      </FormGroup>
    </form>
  )
}

export default LoginForm