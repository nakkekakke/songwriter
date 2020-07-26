import React from 'react'
import { ListItem, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  item: {

  }
}))

const SongListItem = ({ song }) => {
  const classes = useStyles()

  return (
    <ListItem
      component={Link}
      to={`/songs/${song.id}`}
      divider={true}
      className={classes.item}
    >
      <h2>{song.title}</h2>
    </ListItem>
  )
}

SongListItem.propTypes = {
  song: PropTypes.object.isRequired
}

export default SongListItem