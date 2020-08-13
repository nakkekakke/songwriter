import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import NavigationPrompt from 'react-router-navigation-prompt'
import PropTypes from 'prop-types'
import DialogCloseButton from '../DialogCloseButton'

const UnsavedPrompt = ({ handleSaveAgreeClick, handleSaveDiscardClick, unsavedChanges }) => {

  const navPrompt = (isActive, onCancel, onConfirm) => {
    return (
      <Dialog
        open={isActive}
        onClose={onCancel}
      >
        <DialogTitle>You have unsaved changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you leave without saving, all changes will be lost!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePromptConfirmSaveClick(onConfirm)} color='primary' variant='contained'>
            Save and leave
          </Button>
          <Button onClick={handlePromptConfirmDiscardClick(onConfirm)} color='secondary' variant='contained'>
            Leave without saving
          </Button>
          <DialogCloseButton onClick={onCancel} />
        </DialogActions>
      </Dialog>
    )
  }

  const handlePromptConfirmSaveClick = (onConfirm) => () => {
    handleSaveAgreeClick()
    onConfirm()
  }

  const handlePromptConfirmDiscardClick = (onConfirm) => () => {
    handleSaveDiscardClick()
    onConfirm()
  }

  return (
    <NavigationPrompt when={unsavedChanges()}>
      {({ isActive, onCancel, onConfirm }) => navPrompt(isActive, onCancel, onConfirm) }
    </NavigationPrompt>
  )
}

UnsavedPrompt.propTypes = {
  handleSaveAgreeClick: PropTypes.func.isRequired,
  handleSaveDiscardClick: PropTypes.func.isRequired,
  unsavedChanges: PropTypes.func.isRequired
}

export default UnsavedPrompt