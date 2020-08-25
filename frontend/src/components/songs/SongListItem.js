import React from 'react'
import { ListItem, makeStyles, Typography, Container, Box, Icon } from '@material-ui/core'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import SongMenu from './SongMenu'
import { SortableHandle } from 'react-sortable-hoc'
import { DragIndicator } from '@material-ui/icons'

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

const DragHandle = SortableHandle(() => <Box style={{ marginTop: 18, marginLeft: -12 }}> <Icon><DragIndicator /></Icon> </Box>)

const SongListItem = ({ song }) => {
  const classes = useStyles()


  return (
    <Container maxWidth='xl' className={classes.container}>
      <DragHandle />
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