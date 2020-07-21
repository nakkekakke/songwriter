import React from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles, Container, Button } from '@material-ui/core'
import songService from '../services/songService'
import SongSection from './SongSection'

const useStyles = makeStyles(() => ({
  root: {

  },
  menuContainer: {
    marginBottom: '3px'
  },
  menuButton: {
    marginBottom: '1em'
  }
}))

const Song = ({ songs }) => {
  const classes = useStyles()

  const id = useParams().id
  let song
  if (songs && songs.length > 0) {
    song = songs.find(s => s.id === Number(id))
  } else {
    song = songService.getOne(id)
  }

  song && song.sections ? console.log('hei', song.sections) : console.log('')

  song && song.sections ? console.log('hai', song.sections[0]) : console.log('')

  return (
    <div className={classes.root}>
      <h1>{song ? song.title : 'No title'}</h1>
      <div>
        <Container align='right' maxWidth={false} className={classes.menuContainer}>
          <Button color='primary' variant='contained'>Edit song</Button>
        </Container>
        <Container maxWidth={false} align='left'>
          {song && song.sections ? song.sections.map(section => {
            return <SongSection key={section} section={section} />
          }) : <p>Loading</p>}
        </Container>
      </div>
    </div>
  )
}

export default Song