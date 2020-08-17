const express = require('express')
const app = express()
const cors = require('cors')
const songRouter = require('./routers/songs')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const path = require('path')
const databaseSetup = require('./database/databaseSetup')
const userRouter = require('./routers/users')
const loginRouter = require('./routers/login')
const jwt = require('express-jwt')
const config = require('./utils/config')

let dbConnection = databaseSetup.connect()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.use(requestLogger)

app.use(jwt({
  secret: config.JWT_SECRET,
  algorithms: ['HS256']
}).unless({
  path: [
    '/',
    /^(\/api?\/login\/?)$/,  // /login(/) and /api/login(/)
    /^(\/register\/?)$/     // /register(/)
  ]
}))

app.use('/api/songs', songRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

// If url is for React router
app.get('/song*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = { app, dbConnection }
