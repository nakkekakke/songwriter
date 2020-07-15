import React, { useState, useEffect } from 'react'
import { List, Divider } from '@material-ui/core'
import Notification from './Notification'
import SongListItem from './SongListItem'

const SongList = ({ songs, errorMessage }) => {

  console.log('Rendered', songs.length, 'songs')

  const listSongs = () => songs.map(song =>
    <div key={song.id} >
      <SongListItem
        to={`/songs/${song.id}`}
        song={song}
      />
      <Divider/>
    </div>
  )
  
  return (
    <>
      <h1>Songs</h1>
      <Notification message={errorMessage} />
      <List>
        {listSongs()}
      </List>
    </>
  )
}

export default SongList