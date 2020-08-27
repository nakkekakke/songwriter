import React from 'react'
import { Container } from '@material-ui/core'
import arrayMove from 'array-move'
import { useDispatch } from 'react-redux'
import { sortSections } from '../../redux/songReducer'
import SortableSectionList from './SortableSectionList'


const SongSectionList = ({ song }) => {

  const dispatch = useDispatch()

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
      <SortableSectionList
        song={song}
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