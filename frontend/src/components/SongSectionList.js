import React from 'react'
import { makeStyles, Container } from '@material-ui/core'
import SongSection from './SongSection'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import arrayMove from 'array-move'
import { useDispatch } from 'react-redux'
import { sortSections } from '../redux/songReducer'

const useStyles = makeStyles(() => ({
  root: {

  }
}))

const SortableItem = SortableElement(({ section, song, editMode }) => {
  return (
    <SongSection
      songId={song.id}
      section={section}
      editMode={editMode}
    >
    </SongSection>
  )
})

const SortableList = SortableContainer(({ song, editMode }) => {
  return (
    <Container maxWidth={false} align='left'>
      {song.sections.map((section, index) => {
        return (
          <SortableItem
            key={section.id}
            index={index}
            section={section}
            song={song}
            editMode={editMode}
          />
        )
      })}
    </Container>
  )
})

const SongSectionList = ({ song, editMode }) => {

  const dispatch = useDispatch()
  const classes = useStyles()

  const handleSortEnd = ({ oldIndex, newIndex }) => {
    const sortedSections = arrayMove(song.sections, oldIndex, newIndex)
    dispatch(sortSections(song, sortedSections))
  }

  const renderSections = () => {
    if (song.sections.length === 0) {
      return (
        <Container>
          <h2>No sections</h2>
        </Container>
      )
    }
    return (
      <SortableList
        song={song}
        editMode={editMode}
        onSortEnd={handleSortEnd}
        useDragHandle
        useWindowAsScrollContainer
      />
    )
  }

  return (
    renderSections()
  )
}

export default SongSectionList