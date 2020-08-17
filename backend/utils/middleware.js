const config = require('../utils/config')
const jwt = require('express-jwt')

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'Unknown endpoint.' })
}

const errorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('Encountered error:', err.name)
    console.error('Error message:', err.message)
  }

  if (err.name === 'CastError') {
    return res.status(400).send({ error: 'Invalid ID.' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message }) // for custom messages, edit model verification
  } else if (err.name === 'DisconnectedError') {
    return res.status(503).send({ error: 'Could not connect to database.' })
  } else if (err.name === 'UnauthorizedError') {
    return res.status(401).send({ error: 'Invalid token' })
  } else if (err.name !== undefined) {
    return (res.status(500).json({ error: err.message }))
  }

  next(err)
}

const requestLogger = (req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Method:', req.method)
    console.log('Path:', req.path)
    console.log('Body:', req.body)
    console.log('---')
  }
  next()
}

const jwtAuth = (req, res, next) => {
  console.log('AUTHISSA')
  jwt({ secret: config.JWT_SECRET, algorithms: ['HS256'] }).unless({ path: ['/api/login'] })
  next()
}

module.exports = { unknownEndpoint, errorHandler, requestLogger, jwtAuth }