import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

//const Alert = (props) => {
//  return <MuiAlert elevation={6} variant='filled' {...props} />
//}

const SnackbarAlert = ({ message, isError, handleClose }) => {
  return (
    <div>
      <Snackbar open={message !== ''} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          variant='filled'
          onClose={handleClose} 
          severity={isError ? 'error' : 'success'}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  )
}

export default SnackbarAlert