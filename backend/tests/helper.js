const fs = require('fs')
const Song = require('../models/song')

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

const getNonexistingId = async () => {
  const song = await Song.create(sampleSong)
  await song.remove()

  return song._id.toString()
}

module.exports = { getInitialSongs, sampleSong, getNonexistingId }