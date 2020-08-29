import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert } from '../redux/alertReducer'

const SnackbarAlert = () => {

  const dispatch = useDispatch()

  const alert = useSelector((state) => state.alert)

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') {
      dispatch(hideAlert())
    }
  }

  return (
    <Snackbar
      open={alert.open}
      autoHideDuration={5000}
      onClose={handleClose}
      style={{ marginBottom: 5 }}
    >
      <Alert
        variant='filled'
        onClose={handleClose}
        severity={alert.type}
      >
        {alert.message}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarAlert