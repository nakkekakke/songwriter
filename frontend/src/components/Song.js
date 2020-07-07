import React from 'react'

const Song = ({ title, content }) => {
  return (
    <li>
      <h2>{title}</h2>
      <p>{content}</p>
    </li>
  )
}

export default Song