import React from 'react'
import { ListItem, makeStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(() => ({
  item: {

  }
}))

const SongListItem = ({ song }) => {
  const classes = useStyles()

  if (song !== undefined) {
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
}

export default SongListItem