const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, dbConnection } = require('../app')
const Song = require('../models/song')
const { getInitialSongs, sampleSong } = require('./helper')

const api = supertest(app)

let conn

beforeAll(async () => {
  conn = await dbConnection
})

afterAll(async () => {
  await mongoose.disconnect()
  await conn.server.stop()
})

describe('Mongo database', () => {
  test('connection works', async () => {
    expect(conn.db).toBeDefined()
    expect(conn.server).toBeDefined()
  })
})

describe('When there are songs initially in the database', () => {
  beforeEach(async () => {
    await Song.deleteMany({})
    await Song.create(getInitialSongs())
  })

  describe('all songs', () => {

    test('can be successfully retrieved in JSON format', async () => {
      await api
        .get('/api/songs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('have correct amount of songs', async () => {
      const res = await api.get('/api/songs')
      expect(res.body).toHaveLength(3)
    })

    test('do not have _id or __v properties', async () => {
      const res = await api.get('/api/songs')
      res.body.map(song => {
        expect(song._id).not.toBeDefined()
        expect(song.__v).not.toBeDefined()
      })
    })

    test('have correct shape', async () => {
      const res = await api.get('/api/songs')
      res.body.map(song => {
        expect(song).toMatchShapeOf(sampleSong)
      })
    })

  })

  describe('getting a specific song', () => {

    test('succeeds with correct id', async () => {
      const allSongsRes = await api.get('/api/songs')
      const songToGet = allSongsRes.body[0]

      const songToGetRes = await api
        .get(`/api/songs/${songToGet.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(songToGetRes.body).toEqual(songToGet)
    })

    // TODO!
    // test('fails if invalid id', async () => {
    //   const allSongsRes = await api.get('/api/songs')
    //   const songToGet = allSongsRes.body[0]

    //   const songToGetRes = await api
    //     .get(`/api/songs/${songToGet.id}`)
    //     .expect(404)

    //   expect(songToGetRes.body).not.toBeDefined()
    // })

  })


})

