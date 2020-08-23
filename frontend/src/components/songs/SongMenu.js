import React, { useState } from 'react'
import { IconButton, Menu, MenuItem, makeStyles, Button } from '@material-ui/core'
import { MoreVert } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { deleteSong, cloneSong } from '../../redux/songReducer'
import DeleteDialog from './DeleteDialog'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  menu: {
    '& .MuiPaper-root': {
      //backgroundColor: '#e8e8e8ed'
    }
  }
}))

const SongMenu = ({ song }) => {
  const [anchorTo, setAnchorTo] = useState(null)
  const [delConfirmOpen, setDelConfirmOpen] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.auth.user)

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
        elevation={1}
        anchorEl={anchorTo}
        keepMounted
        open={anchorTo !== null}
        onClose={handleClose}
        className={classes.menu}
      >
        <MenuItem>
          <Button
            variant='outlined'
            color='primary'
            onClick={handleCloneClick}
          >
            Clone
          </Button>
        </MenuItem>
        <MenuItem>
          <Button
            variant='outlined'
            color='secondary'
            onClick={handleDeleteClick}
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