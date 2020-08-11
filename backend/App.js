const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const songRouter = require('./routers/songs')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to Mongo!')
  })
  .catch(error => {
    console.log('Error connecting to Mongo:', error)
  })

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

app.use('/api/songs', songRouter)

app.use(middleware.unknownEndpoint)

module.exports = app