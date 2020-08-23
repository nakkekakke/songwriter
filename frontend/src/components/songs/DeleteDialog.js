import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import PropTypes from 'prop-types'

const DeleteDialog = ({ open, setOpen, handleConfirmClick }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Delete this song?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Once deleted, this song cannot be restored.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmClick} color='secondary' variant='contained'>
          Delete permanently
        </Button>
        <Button onClick={() => setOpen(false)} variant='contained'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleConfirmClick: PropTypes.func.isRequired
}

export default DeleteDialog