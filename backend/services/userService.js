const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const config = require('../utils/config')

const authenticate = async (username, password) => {
  const user = await User.findOne({ username })
  if (!user) {
    return null
  }

  const correctPassword = bcrypt.compareSync(password, user.password)
  if (!correctPassword) {
    return null
  }

  return jwt.sign({ username, id: user._id }, config.JWT_SECRET, { expiresIn: '1h' })
}

const verifySongs = async (username, songIds) => {
  const user = await User.findOne({ username: username }).populate('songs')
  if (user.songs.length !== songIds.length) {
    return false
  }
  const userSongIds = user.songs.map(s => s._id.toString())
  const sortedUserSongIds = userSongIds.sort()
  const sortedSongIds = [...songIds].sort()

  for (let i = 0; i < songIds.length; i++) {
    if (sortedSongIds[i] !== sortedUserSongIds[i]) {
      return false
    }
  }
  return true
}

module.exports = { authenticate, verifySongs }