const mongoose = require('mongoose')
const supertest = require('supertest')
const { app, dbConnection } = require('../app')
const Song = require('../models/song')
const { getInitialSongs, sampleSong, getNonexistingId } = require('./helper')

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

  let initialSongs

  beforeEach(async () => {
    await Song.deleteMany({})
    initialSongs = await Song.create(getInitialSongs())
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
      expect(res.body).toHaveLength(initialSongs.length)
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

      test('if no song with that id exists', async () => {
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
        const postRes = await api
          .post('/api/songs')
          .send(sampleSong)
          .expect(200)
        expect(postRes.body).toBeDefined()
        expect(postRes.body).toMatchShapeOf(sampleSong)
      })

      describe('and assigns the song a new 24 character id', () => {

        test('that replaces its previous id', async () => {
          const postRes = await api
            .post('/api/songs')
            .send(sampleSong)
            .expect(200)

          const newSong = postRes.body
          expect(newSong.id).toBeDefined()
          expect(newSong.id).not.toEqual(sampleSong.id)
          expect(newSong.id).toHaveLength(24)
        })

        test('even if it initially had no id', async () => {
          const songWithNoId = { ...sampleSong }
          delete songWithNoId.id

          const postRes = await api
            .post('/api/songs')
            .send(songWithNoId)
            .expect(200)

          const newSong = postRes.body
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
          expect(songsRes.body).toHaveLength(initialSongs.length)
        })

        test('has invalid data', async () => {
          const invalidSong = { ...sampleSong, title: '' }

          await api
            .post('/api/songs')
            .send(invalidSong)
            .expect(400)

          const songsRes = await api.get('/api/songs')
          expect(songsRes.body).toHaveLength(initialSongs.length)
        })

      })

      describe('if sections', () => {
        //// Mongoose seems to create this property automatically if it doesnt exist...

        test('have invalid data', async () => {
          const invalidSong = { ...sampleSong, sections: [1] }

          await api
            .post('/api/songs')
            .send(invalidSong)
            .expect(400)

          const songsRes = await api.get('/api/songs')
          expect(songsRes.body).toHaveLength(initialSongs.length)
        })

      })

    })

  })

  describe('deleting a song', () => {

    test('succeeds with an existing id', async () => {
      const existingId = initialSongs[0].id

      await api
        .delete('/api/songs/' + existingId)
        .expect(200)

      const songsRes = await api.get('/api/songs')
      expect(songsRes.body.map(s => s.id)).not.toEqual(expect.arrayContaining([existingId])) // Map should not contain existingId
      expect(songsRes.body).toHaveLength(initialSongs.length - 1)
    })

    test('fails if no song with that id exists', async () => {
      const nonExistingId = await getNonexistingId()

      await api.delete('/api/songs/' + nonExistingId)

      const songsRes = await api.get('/api/songs')
      expect(songsRes.body).toHaveLength(initialSongs.length)
    })

  })

  describe('editing a song', () => {

    test('succeeds with an existing id', async () => {
      const initialTitle = initialSongs[0].title
      let songToEdit = initialSongs[0]
      songToEdit.title = 'Edited title'

      const editRes = await api
        .put('/api/songs/' + songToEdit.id)
        .send(songToEdit)
        .expect(200)

      expect(editRes.body.id).toEqual(songToEdit.id)
      expect(editRes.body.title).not.toEqual(initialTitle)
      expect(editRes.body.title).toEqual(songToEdit.title)
    })

    test('fails if no song with that id exists', async () => {
      let songToEdit = initialSongs[0]
      songToEdit.title = 'Edited title'
      songToEdit._id = await getNonexistingId()

      const editRes = await api
        .put('/api/songs/' + songToEdit.id)
        .send(songToEdit)
        .expect(200)

      expect(editRes.body).toEqual(null)

      const songsRes = await api.get('/api/songs')
      expect(songsRes.body).toHaveLength(initialSongs.length)
    })

  })

})

