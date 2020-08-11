const getDefaultSong = (Song) => {
  return new Song({
    title: 'Default song',
    sections: [
      {
        name: 'Default section',
        lines: ['Line 1', 'Line 2']
      }
    ]
  })
}

module.exports = getDefaultSong