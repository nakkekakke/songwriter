import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { Container } from '@material-ui/core'
import SongListItem from './SongListItem'

const SortableSong = SortableElement(({ song }) => {
  return (
    <SongListItem
      song={song}
    >
    </SongListItem>
  )
})

const SortableSongList = SortableContainer(({ songs }) => {
  return (
    <Container maxWidth={false} align='left'>
      {songs.map((song, index) => {
        return (
          <SortableSong
            key={song.id}
            index={index}
            song={song}
          />
        )
      })}
    </Container>
  )
})

export default SortableSongList