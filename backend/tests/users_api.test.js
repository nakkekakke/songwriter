const mongoose = require('mongoose')
const { dbConnection } = require('../app')
const User = require('../models/user')
const {
  getInitialSongs,
  sampleSong,
  getNonexistingId,
  api,
  userCred
} = require('./helper')

let conn
let token
let testUser

const userAddedSong = () => {
  return { ...sampleSong, userId: testUser.id }
}


beforeAll(async () => {
  conn = await dbConnection
})

afterAll(async () => {
  await mongoose.disconnect()
  await conn.server.stop()
})


describe('When user is authenticated', () => {
  beforeAll(async () => {
    const userRes = await api.post('/api/users').send(userCred)
    const tokenRes = await api.post('/api/token').send(userCred)
    testUser = userRes.body
    token = tokenRes.body.token
  })

  test('getting all users succeeds', async () => {
    const usersRes = await api
      .get('/api/users', token)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(usersRes.body).toHaveLength(1)
    expect(usersRes.body[0]).toEqual(testUser)
  })

  test('getting one user succeeds', async () => {
    const usersRes = await api
      .get('/api/users/' + testUser.id, token)
      .expect(200)

    expect(usersRes.body).toEqual(testUser)
  })

})

describe('When user is not authenticated', () => {

})