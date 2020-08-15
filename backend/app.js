const express = require('express')
const app = express()
const cors = require('cors')
const songRouter = require('./routers/songs')
const { requestLogger, unknownEndpoint, errorHandler } = require('./utils/middleware')
const path = require('path')
const databaseSetup = require('./database/databaseSetup')

let dbConnection = databaseSetup.connect()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.use('/api/songs', songRouter)

// If url is for React router
app.get('/song*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
})

app.use(requestLogger)
app.use(unknownEndpoint)
app.use(errorHandler)

module.exports = { app, dbConnection }