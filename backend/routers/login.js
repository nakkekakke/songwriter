const loginRouter = require('express').Router()
const { authenticate } = require('../services/userService')

loginRouter.post('/', async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  try {
    const token = await authenticate(username, password)
    if (!token) {
      return res.status(401).json({ error: 'Username and password don\'t match' })
    }

    res.status(200).send({ token, username })
  } catch (error) {
    next(error)
  }
})

module.exports = loginRouter