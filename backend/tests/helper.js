const fs = require('fs')

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

module.exports = { getInitialSongs, sampleSong }