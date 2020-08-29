import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, Tooltip } from '@material-ui/core'
import NavigationPrompt from 'react-router-navigation-prompt'
import PropTypes from 'prop-types'
import DialogCloseButton from '../DialogCloseButton'

const UnsavedPrompt = (
  {
    handleSaveConfirmClick,
    handleSaveDiscardClick,
    unsavedChanges,
    saveAllowed = true
  }
) => {

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
          {saveAllowed ? saveButton(onConfirm) : disabledSaveButton(onConfirm)}
          <Button
            onClick={handlePromptDiscardClick(onConfirm)}
            color='secondary'
            variant='contained'
          >
            Leave without saving
          </Button>
          <DialogCloseButton onClick={onCancel} />
        </DialogActions>
      </Dialog>
    )
  }

  const saveButton = (onConfirm) => {
    return (
      <Button
        onClick={handlePromptSaveClick(onConfirm)}
        color='primary'
        variant='contained'
      >
        Save and leave
      </Button>
    )
  }

  const disabledSaveButton = (onConfirm) => {
    return (
      <Tooltip title='Resolve errors before saving' arrow>
        <span> {/* !! Extra wrapper required for Safari !! */}
          <Button
            onClick={handlePromptSaveClick(onConfirm)}
            color='primary'
            variant='contained'
            disabled
          >
            Can&apos;t save
          </Button>
        </span>
      </Tooltip>
    )
  }

  const handlePromptSaveClick = (onConfirm) => () => {
    handleSaveConfirmClick()
    onConfirm()
  }

  const handlePromptDiscardClick = (onConfirm) => () => {
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
  handleSaveConfirmClick: PropTypes.func.isRequired,
  handleSaveDiscardClick: PropTypes.func.isRequired,
  unsavedChanges: PropTypes.func.isRequired,
  saveAllowed: PropTypes.bool
}

export default UnsavedPrompt