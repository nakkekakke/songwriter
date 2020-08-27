import React from 'react'
import { List, makeStyles, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { Add } from '@material-ui/icons'
import songHelper from '../../helpers/songHelper'
import { createSong, sortSongs } from '../../redux/songReducer'
import { useHistory } from 'react-router'
import Heading from '../Heading'
import SortableSongList from './SortableSongList'
import arrayMove from 'array-move'
import userService from '../../services/userService'
import { showAlert, alerts } from '../../redux/alertReducer'

const useStyles = makeStyles(() => ({
  list: {
    marginTop: 10
  },
  addSongButton: {
    margin: 8
  }
}))

const SongList = () => {
  const classes = useStyles()
  const songs = useSelector((state) => state.songs)
  const user = useSelector((state) => state.auth.user)
  const dispatch = useDispatch()
  const history = useHistory()

  console.log('Rendered', songs.length, 'songs')

  const handleNewSongClick = () => {
    dispatch(createSong(songHelper.getDefaultSong(user))) // Note: not error handling createSong
      .then(res => {
        history.push('/songs/' + res.id)
        console.log('Redirected!')
      })
      .catch(() => console.log('Error creating song'))
  }

  const handleSortEnd = async ({ oldIndex, newIndex }) => {
    const sortedSongs = arrayMove(songs, oldIndex, newIndex)
    console.log('Sort ended')
    dispatch(sortSongs(sortedSongs))  // Seperated from the backend call so sorting looks smoother for user
    try {
      await userService.editSongs(user.username, sortedSongs)
    } catch (error) {
      dispatch(showAlert(alerts.dataDesync))
    }
  }

  const songList = () => {
    return (
      <SortableSongList
        songs={songs}
        onSortEnd={handleSortEnd}
        useWindowAsScrollContainer
        useDragHandle
      />
    )
  }

  return (
    <div>
      <Heading text='Your songs' />

      <List className={classes.list}>
        {songs.length !== 0 ? songList() : <p>No songs found</p>}
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