import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import NavigationPrompt from 'react-router-navigation-prompt'

const UnsavedPrompt = ({ handleSaveAgreeClick, handleSaveDiscardClick, unsavedChanges }) => {

  const navPrompt = (isActive, onCancel, onConfirm) => {
    return (
      <Dialog
        open={isActive}
        onClose={onCancel}
      >
        <DialogTitle>You have made unsaved changes</DialogTitle>
        <DialogContent>
          <DialogContentText>
            If you leave without saving, all changes will be lost!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePromptConfirmSaveClick(onConfirm)} color='primary' variant='contained'>
            Leave and save
          </Button>
          <Button onClick={handlePromptConfirmDiscardClick(onConfirm)} color='secondary' variant='contained'>
            Leave without saving
          </Button>
          <Button onClick={onCancel} variant='contained'>
            Cancel
          </Button>
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

export default UnsavedPrompt