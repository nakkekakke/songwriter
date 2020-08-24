import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Tooltip } from '@material-ui/core'
import DialogCloseButton from '../DialogCloseButton'
import PropTypes from 'prop-types'

const SaveDialog = ({ open, setOpen, handleConfirmClick, handleDiscardClick, saveAllowed = true }) => {

  const saveButton = () => {
    return (
      <Button onClick={handleConfirmClick} color='primary' variant='contained' >
        Save changes
      </Button>
    )
  }

  const disabledSaveButton = () => {
    return (
      <Tooltip title='Resolve errors before saving' arrow>
        <span> {/* !! Extra wrapper required for Safari !! */}
          <Button onClick={handleConfirmClick} color='primary' variant='contained' disabled >
          Can&apos;t save
          </Button>
        </span>
      </Tooltip>
    )
  }

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
        {saveAllowed ? saveButton() : disabledSaveButton()}
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
  handleDiscardClick: PropTypes.func.isRequired,
  saveAllowed: PropTypes.bool
}

export default SaveDialog