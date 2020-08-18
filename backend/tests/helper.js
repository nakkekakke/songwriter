const fs = require('fs')
const Song = require('../models/song')
const supertest = require('supertest')
const { app } = require('../app')

const getInitialSongs = () => {
  let rawSongs = fs.readFileSync('./tests/test_songs.json')
  return JSON.parse(rawSongs)
}

const sampleSong = {
  id: 'TestID1234',
  title: 'Song title',
  sections: [
    { id: 10,
      name: 'Section name',
      lines: ['Line 1', 'Line 2']
    }
  ]
}

const getInitialUsers = () => {
  let rawUsers = fs.readFileSync('./tests/test_songs.json')
  return JSON.parse(rawUsers)
}

const getNonexistingSongId = async () => {
  const song = await Song.create(sampleSong)
  await song.remove()

  return song._id.toString()
}

const hook = (method = 'post') => (args, token) => {
  if (token) {
    return supertest(app)[method](args)
      .set('Authorization', `Bearer ${token}`)
  }
  return supertest(app)[method](args)
}

const api = {
  post: hook('post'),
  get: hook('get'),
  put: hook('put'),
  delete: hook('delete'),
}

const userCred = { username: 'test', password: 'test' }

module.exports = { getInitialSongs, sampleSong, getNonexistingId: getNonexistingSongId, api, userCred }