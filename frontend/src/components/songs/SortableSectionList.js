import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { Container } from '@material-ui/core'
import SongSection from './SongSection'

const SortableSection = SortableElement(({ section, song, editMode }) => {
  return (
    <SongSection
      songId={song.id}
      sectionId={section.id}
      editMode={editMode}
    >
    </SongSection>
  )
})

const SortableSectionList = SortableContainer(({ song, editMode }) => {
  return (
    <Container maxWidth={false} align='left'>
      {song.sections.map((section, index) => {
        return (
          <SortableSection
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

export default SortableSectionList