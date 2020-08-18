// npm imports
const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const jwt = require('express-jwt')
const slashes = require('connect-slashes')

// Local imports
const config = require('./utils/config')
const dbSetup = require('./database/setup')
const userRouter = require('./routers/users')
const tokenRouter = require('./routers/token')
const songRouter = require('./routers/songs')

// Local middleware
const {
  requestLogger,
  unknownEndpoint,
  errorHandler
} = require('./utils/middleware')

const dbConnection = dbSetup.connect()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
app.use(slashes(false))

app.use(requestLogger)

app.use(jwt({
  secret: config.JWT_SECRET,
  algorithms: ['HS256']
}).unless({
  path: [
    '/api/token',
    /^(?!(\/api)).*/,
    { url: '/api/users', methods: ['POST'] }
  ]
}))

app.use('/api/songs', songRouter)
app.use('/api/users', userRouter)
app.use('/api/token', tokenRouter)

// If url doesn't start with '/api'
app.get(/^(?!(\/api)).*/, (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = { app, dbConnection }
