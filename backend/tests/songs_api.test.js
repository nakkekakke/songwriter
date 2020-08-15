const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, dbConnection } = require('../app')
const Song = require('../models/song')
const { getInitialSongs, sampleSong, getNonexistingId } = require('./helper')

const api = supertest(app)

let conn

let initialSongsCount

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
    const initialSongs = getInitialSongs()
    initialSongsCount = initialSongs.length
    await Song.create(initialSongs)

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
      expect(res.body).toHaveLength(initialSongsCount)
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

    describe('succeeds', () => {

      test('with correct id', async () => {
        const allSongsRes = await api.get('/api/songs')
        const songToGet = allSongsRes.body[0]

        const songToGetRes = await api
          .get(`/api/songs/${songToGet.id}`)
          .expect(200)
          .expect('Content-Type', /application\/json/)

        expect(songToGetRes.body).toEqual(songToGet)
      })

    })

    describe('fails', () => {

      test('if id has invalid shape', async () => {
        const songToGetRes = await api
          .get('/api/songs/totallyinvalidid')
          .expect(400)
        expect(songToGetRes.body.error).toEqual('Invalid ID.')
      })

      test('if no song with that id exist', async () => {
        const badId = await getNonexistingId()
        const songToGetRes = await api
          .get(`/api/songs/${badId}`)
          .expect(404)
        expect(songToGetRes.body).toEqual({})
      })
    })

  })

  describe('creating a new song', () => {

    describe('succeeds', () => {

      test('with valid data', async () => {
        const newSongRes = await api
          .post('/api/songs')
          .send(sampleSong)
          .expect(200)
        expect(newSongRes.body).toBeDefined()
        expect(newSongRes.body).toMatchShapeOf(sampleSong)
      })

      describe('and assigns the song a new 24 character id', () => {

        test('that replaces its previous id', async () => {
          const newSongRes = await api
            .post('/api/songs')
            .send(sampleSong)
            .expect(200)

          const newSong = newSongRes.body
          expect(newSong.id).toBeDefined()
          expect(newSong.id).not.toEqual(sampleSong.id)
          expect(newSong.id).toHaveLength(24)
        })

        test('even if it initially had no id', async () => {
          const songWithNoId = { ...sampleSong }
          delete songWithNoId.id

          const newSongRes = await api
            .post('/api/songs')
            .send(songWithNoId)
            .expect(200)

          const newSong = newSongRes.body
          expect(newSong.id).toBeDefined()
          expect(newSong.id).toHaveLength(24)
        })

      })

    })

    describe('fails', () => {

      describe('if title', () => {

        test('property is missing', async () => {
          const invalidSong = { ...sampleSong }
          delete invalidSong.title

          await api
            .post('/api/songs')
            .send(invalidSong)
            .expect(400)

          const songsRes = await api.get('/api/songs')
          expect(songsRes.body).toHaveLength(initialSongsCount)
        })

        test('has invalid data', async () => {
          const invalidSong = { ...sampleSong, title: '' }

          await api
            .post('/api/songs')
            .send(invalidSong)
            .expect(400)

          const songsRes = await api.get('/api/songs')
          expect(songsRes.body).toHaveLength(initialSongsCount)
        })

      })

      describe('if sections', () => {
        //// Mongoose seems to create this property automatically if it doesnt exist...
        // test('property is missing', async () => {
        //   const invalidSong = { ...sampleSong }
        //   delete invalidSong.sections

        //   const newSongRes = await api
        //     .post('/api/songs')
        //     .send(invalidSong)
        //     .expect(400)

        //   expect(newSongRes.body.error).toBeDefined()
        // })

        test('have invalid data', async () => {
          const invalidSong = { ...sampleSong, sections: [1] }

          await api
            .post('/api/songs')
            .send(invalidSong)
            .expect(400)

          const songsRes = await api.get('/api/songs')
          expect(songsRes.body).toHaveLength(initialSongsCount)
        })

      })

    })

  })

})

