import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert } from '../redux/alertReducer'

//const Alert = (props) => {
//  return <MuiAlert elevation={6} variant='filled' {...props} />
//}

const SnackbarAlert = () => {

  const dispatch = useDispatch()

  const alert = useSelector((state) => state.alert)

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') {
      dispatch(hideAlert())
    }
  }

  return (
    <div>
      <Snackbar open={alert.open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          variant='filled'
          onClose={handleClose}
          severity={alert.type}
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SnackbarAlert