import React from 'react'
import { SortableContainer, SortableElement } from 'react-sortable-hoc'
import { Container } from '@material-ui/core'
import SongSection from './SongSection'

const SortableSection = SortableElement(({ section, song }) => {
  return (
    <SongSection
      songId={song.id}
      sectionId={section.id}
    >
    </SongSection>
  )
})

const SortableSectionList = SortableContainer(({ song }) => {
  return (
    <Container maxWidth={false} align='left'>
      {song.sections.map((section, index) => {
        return (
          <SortableSection
            key={section.id}
            index={index}
            section={section}
            song={song}
          />
        )
      })}
    </Container>
  )
})

export default SortableSectionList