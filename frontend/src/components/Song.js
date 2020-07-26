import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles, Container, Button } from '@material-ui/core'
import songService from '../services/songService'
import SongSection from './SongSection'
import PropTypes from 'prop-types'

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

const Song = ({ setAlertMessage, setAlertIsError }) => {
  const [song, setSong] = useState()

  const classes = useStyles()
  const id = useParams().id

  useEffect(() => {
    console.log('Song effect')
    songService
      .getOne(Number(id))
      .then(loadedSong => {
        setSong(loadedSong)
      })
      .catch(() => {
        setAlertIsError(true)
        setAlertMessage('Couldn\'t load song')
      })
  }, [id, setAlertMessage, setAlertIsError])

  console.log('Song:', song)

  return (
    <div className={classes.root}>
      <h1>{song ? song.title : 'No title'}</h1>
      <div>
        <Container align='right' maxWidth={false} className={classes.menuContainer}>
          <Button color='primary' variant='contained'>Edit song</Button>
        </Container>
        <Container maxWidth={false} align='left'>
          {song && song.sections ? song.sections.map(section => {
            return <SongSection key={section.name} section={section} /> // Section names should be unique
          }) : <p>Loading</p>}
        </Container>
      </div>
    </div>
  )
}

Song.propTypes = {
  setAlertIsError: PropTypes.func.isRequired,
  setAlertMessage: PropTypes.func.isRequired
}

export default Song