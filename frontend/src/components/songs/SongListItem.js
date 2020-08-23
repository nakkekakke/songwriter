import React from 'react'
import { ListItem, makeStyles, Typography, Container } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import SongMenu from './SongMenu'

const useStyles = makeStyles(() => ({
  item: {

  },
  container: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  title: {
    textAlign: 'left',
    marginTop: 8,
    marginBottom: 8
  },
  menu: {

  }
}))

const SongListItem = ({ song }) => {
  const classes = useStyles()

  return (
    <Container maxWidth='xl' className={classes.container}>
      <ListItem
        component={Link}
        to={`/songs/${song.id}`}
        divider={true}
        className={classes.item}
      >
        
        <Typography variant='h6' className={classes.title}>
          {song.title}
        </Typography>
      </ListItem>
      <SongMenu song={song} className={classes.menu} />
    </Container>
  )
}

SongListItem.propTypes = {
  song: PropTypes.object.isRequired
}

export default SongListItem