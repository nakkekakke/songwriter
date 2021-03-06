import React, { useState } from 'react'
import { IconButton, Menu, MenuItem, Button } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSong, cloneSong } from '../../redux/songReducer'
import DeleteDialog from '../songs/dialogs/DeleteDialog'
import PropTypes from 'prop-types'

const SongMenu = ({ song }) => {
  const [anchorTo, setAnchorTo] = useState(null)
  const [delConfirmOpen, setDelConfirmOpen] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)
  const darkMode = useSelector((state) => state.statuses.darkMode)

  const handleClick = (event) => {
    setAnchorTo(event.target)
  }

  const handleClose = () => {
    setAnchorTo(null)
  }

  const handleCloneClick = () => {
    dispatch(cloneSong(song, user.username))
    handleClose()
  }

  const handleDeleteClick = () => {
    setDelConfirmOpen(true)
    handleClose()
  }

  const handleDeleteConfirmClick = () => {
    dispatch(deleteSong(song))
  }

  return (
    <>
      <IconButton
        onClick={handleClick}
      >
        <MoreVert />
      </IconButton>
      <Menu
        onClose={handleClose}
        open={anchorTo !== null}
        anchorEl={anchorTo}
        elevation={1}
        keepMounted
      >
        <MenuItem>
          <Button
            onClick={handleCloneClick}
            variant={darkMode ? 'contained' : 'outlined'}
            color='primary'
          >
            Clone
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            onClick={handleDeleteClick}
            variant={darkMode ? 'contained' : 'outlined'}
            color='secondary'
          >
            Delete
          </Button>
        </MenuItem>
      </Menu>
      <DeleteDialog
        open={delConfirmOpen}
        setOpen={setDelConfirmOpen}
        handleConfirmClick={handleDeleteConfirmClick}
      />
    </>
  )
}

SongMenu.propTypes = {
  song: PropTypes.object.isRequired
}

export default SongMenu