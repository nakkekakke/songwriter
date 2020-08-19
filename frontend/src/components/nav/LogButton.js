import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/authReducer'
import { useHistory } from 'react-router'

const LogButton = ({ loggedIn }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogClick = () => {
    if (loggedIn) {
      dispatch(logout())
    }
    history.push('/')
  }

  return (
    <Button
      color='inherit'
      onClick={handleLogClick}
    >
      {loggedIn ? 'Logout' : 'Login'}
    </Button>
  )
}

export default LogButton