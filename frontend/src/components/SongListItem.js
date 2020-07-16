import React from 'react'
import { ListItem } from '@material-ui/core'
import { Link } from 'react-router-dom'

const SongListItem = ({ song }) => {
  if (song !== undefined) {
    return (
      <ListItem component={Link} to={`/songs/${song.id}`} >
        <div>
          <h2>{song.title}</h2>
        </div>
      </ListItem>
    )
  }
}

export default SongListItem