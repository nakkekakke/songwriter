import React from 'react'
import { makeStyles, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import PropTypes from 'prop-types'

const useStyles = makeStyles((theme) => ({
  root: {

  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
}))

const DialogCloseButton = ({ onClick }) => {
  const classes = useStyles()

  return (
    <IconButton onClick={onClick} className={classes.closeButton}>
      <Close />
    </IconButton>
  )
}

DialogCloseButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default DialogCloseButton