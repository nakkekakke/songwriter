const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
  name: String,
  lines: [String]
})

const songSchema = new mongoose.Schema({
  title: String,
  sections: [sectionSchema]
})

songSchema.set('toJSON', {
  transform: (doc, song) => {
    song.id = song._id.toString()
    song.sections = song.sections.map(s => {
      console.log('S before:', s)
      let editedS = { ...s }
      editedS.id = s._id.toString()
      delete editedS._id
      console.log('S after:', editedS)
      return editedS
    })
    delete song._id
    delete song.__v
  }
})

module.exports = mongoose.model('Song', songSchema)

