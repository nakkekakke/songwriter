import React from 'react'
import { Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/authReducer'
import { useHistory } from 'react-router'
import PropTypes from 'prop-types'
import { showAlert, alerts } from '../../redux/alertReducer'

const LogButton = ({ loggedIn }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogClick = () => {
    if (loggedIn) {
      dispatch(logout())
      dispatch(showAlert(alerts.logout))
    }
    history.push('/')
  }

  return (
    <Button
      color='inherit'
      onClick={handleLogClick}
    >
      {loggedIn ? 'Log out' : 'Log in'}
    </Button>
  )
}

LogButton.propTypes = {
  loggedIn: PropTypes.bool
}

export default LogButton