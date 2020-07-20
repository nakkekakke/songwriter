import React from 'react'
import { List, makeStyles } from '@material-ui/core'
import SongListItem from './SongListItem'

const useStyles = makeStyles(() => ({
  root: {

  }
}))

const SongList = ({ songs }) => {
  const classes = useStyles()

  console.log('Rendered', songs.length, 'songs')

  const listSongs = () => songs.map(song =>
    <SongListItem
      key={song.id}
      to={`/songs/${song.id}`}
      song={song}
    />
  )

  return (
    <div className={classes.root}>
      <h1>Songs</h1>
      <List>
        {songs.length !== 0 ? listSongs() : <p>No songs found</p>}
      </List>
    </div>
  )
}

export default SongList