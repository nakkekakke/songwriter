const config = require('../utils/config')
const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')

const connect = async () => {
  let url = config.MONGO_URL

  if (process.env.NODE_ENV === 'test') {
    const server = new MongoMemoryServer()
    url = await server.getUri()
    try {
      const db = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
      console.log('Connected to Mongo memory server!')
      return { db, server }
    } catch (error) {
      console.log('Error connecting to Mongo memory server', error)
    }
  }

  try {
    const db = await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    console.log('Connected to Mongo Atlas!')
    return db
  } catch (error) {
    console.log('Error connecting to Mongo Atlas:', error)
  }
}

module.exports = { connect }