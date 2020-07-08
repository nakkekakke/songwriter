import React from 'react'
import { ListItem } from '@material-ui/core'

const Song = ({ title, content }) => {
  return (
    <ListItem>
      <div>
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </ListItem>
  )
}

export default Song