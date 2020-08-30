const fs = require('fs')
const Song = require('../models/song')
const User = require('../models/user')
const supertest = require('supertest')
const { app } = require('../app')

const getInitialSongs = () => {
  let rawSongs = fs.readFileSync('./tests/test_songs.json')
  return JSON.parse(rawSongs)
}

const assignUserToSongs = (songs, user) => {
  songs.forEach(song => {
    song.user = user.id
  })
  return songs
}

const initializeSongsAndUser = async (songs, user) => {
  const songsWithUser = assignUserToSongs(songs, user)
  const savedSongs = await Song.create(songsWithUser)
  const songIds = savedSongs.map(s => s._id)
  const savedUser = await User.findByIdAndUpdate(user.id, { songs: songIds }, { new: true, useFindAndModify: false })
  return { songs: savedSongs, user: savedUser }
}

const sampleSong = {
  id: 'TestID1234',
  title: 'Song title',
  sections: [
    { id: 10,
      name: 'Section name',
      lines: ['Line 1', 'Line 2']
    }
  ],
  user: '123456789012345678901234'
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

module.exports = {
  getInitialSongs,
  sampleSong,
  getNonexistingSongId,
  api,
  userCred,
  initializeSongsAndUser
}