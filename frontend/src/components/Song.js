import React from 'react'
import { useParams } from 'react-router-dom'

const Song = ({ songs }) => {
  const id = useParams().id
  let song
  if (songs) {
    song = songs.find(s => s.id === Number(id))
  }
  
  return (
    <div>
      <h1>{song ? song.title : 'No title'}</h1>
      <p>{song ? song.content : 'No content'}</p>
    </div>
  )
}

export default Song