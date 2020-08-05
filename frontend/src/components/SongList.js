import React from 'react'
import { List, makeStyles, Button } from '@material-ui/core'
import SongListItem from './SongListItem'
import { useSelector, useDispatch } from 'react-redux'
import { Add } from '@material-ui/icons'
import songHelper from '../helpers/songHelper'
import { createSong } from '../redux/songReducer'
import { useHistory } from 'react-router'

const useStyles = makeStyles(() => ({
  root: {

  },
  addSongButton: {
    margin: '8px'
  }
}))

const SongList = () => {
  const classes = useStyles()
  const songs = useSelector((state) => state)
  const dispatch = useDispatch()
  const history = useHistory()

  console.log('Rendered', songs.length, 'songs')

  const handleNewSongClick = () => {
    dispatch(createSong(songHelper.getDefaultSong())) // Note: not error handling createSong
      .then(res => {
        history.push('/songs/' + res.id)
        console.log('Redirected!')
      })
      .catch(e => console.log('Error creating new song:', e))
  }

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
      <Button
        className={classes.addSongButton}
        variant='contained'
        color='primary'
        startIcon={<Add />}
        onClick={handleNewSongClick}
      >
        New song
      </Button>
    </div>
  )
}

export default SongList