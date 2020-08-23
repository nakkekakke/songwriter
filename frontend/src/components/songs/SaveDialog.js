import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import DialogCloseButton from '../DialogCloseButton'
import PropTypes from 'prop-types'

const SaveDialog = ({ open, setOpen, handleConfirmClick, handleDiscardClick }) => {
  return (
    <Dialog
      open={open}
      onClose={() => setOpen(false)}
    >
      <DialogTitle>Save changes?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Save or discard the changes you have made.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmClick} color='primary' variant='contained'>
          Save changes
        </Button>
        <Button onClick={handleDiscardClick} color='secondary' variant='contained'>
          Discard changes
        </Button>
        <DialogCloseButton onClick={() => setOpen(false)} />
      </DialogActions>
    </Dialog>
  )
}

SaveDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  handleConfirmClick: PropTypes.func.isRequired,
  handleDiscardClick: PropTypes.func.isRequired
}

export default SaveDialog