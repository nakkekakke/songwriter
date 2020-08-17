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

module.exports = { authenticate }