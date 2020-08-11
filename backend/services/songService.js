const getDefaultSong = (Song) => {
  return new Song({
    title: 'Default song',
    sections: [
      {
        id: 1,
        name: 'Default section',
        lines: ['Line 1', 'Line 2']
      }
    ]
  })
}

module.exports = getDefaultSong