const mongoose = require('mongoose')
const { dbConnection } = require('../app')
const User = require('../models/user')
const {
  getInitialSongs,
  api,
  userCred,
  initializeSongsAndUser
} = require('./helper')

let conn
let token
let testUser = { songs: [] }


beforeAll(async () => {
  conn = await dbConnection
})

beforeEach(async () => {
  await User.deleteMany({})
  const userRes = await api.post('/api/users').send(userCred)
  testUser = userRes.body
})

afterAll(async () => {
  await mongoose.disconnect()
  await conn.server.stop()
})


describe('When user is authenticated', () => {
  beforeEach(async () => {
    const tokenRes = await api.post('/api/token').send(userCred)
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

  test('sorting user songlist succeeds with valid song ids', async () => {
    const initialized = await initializeSongsAndUser(getInitialSongs(), testUser)
    const originalSongIds = initialized.songs.map(s => s._id.toString())

    const songIds = [...originalSongIds]

    const temp = songIds[0]
    songIds[0] = songIds[1]
    songIds[1] = temp

    const userRes = await api
      .put('/api/users/songs', token)
      .send({ username: initialized.user.username, songIds })
      .expect(200)

    expect(userRes.body.songs).toEqual(songIds)
  })

})

describe('When user is not authenticated', () => {

  test('getting all users will fail', async () => {
    const usersRes = await api
      .get('/api/users')
      .expect(401)

    expect(usersRes.body).toEqual({ 'error': 'Invalid token' })
  })

  test('getting one user will fail', async () => {
    const usersRes = await api
      .get('/api/users' + testUser.id)
      .expect(401)

    expect(usersRes.body).toEqual({ 'error': 'Invalid token' })
  })

  test('user can authenticate with correct credentials', async () => {
    const tokenRes = await api
      .post('/api/token')
      .send(userCred)
      .expect(200)

    expect(tokenRes.body.token).toBeDefined()
    expect(typeof tokenRes.body.token).toEqual('string')
    expect(tokenRes.body.username).toEqual(userCred.username)
  })

  test('sorting some user\'s list will fail', async () => {
    const initialized = await initializeSongsAndUser(getInitialSongs(), testUser)
    const originalSongIds = initialized.songs.map(s => s._id.toString())

    const songIds = [...originalSongIds]

    const temp = songIds[0]
    songIds[0] = songIds[1]
    songIds[1] = temp

    const userRes = await api
      .put('/api/users/songs')
      .send({ username: initialized.user.username, songIds })
      .expect(401)

    expect(userRes.body).toEqual({ 'error': 'Invalid token' })
  })
})