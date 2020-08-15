const mongoose = require('mongoose')

const sectionSchema = new mongoose.Schema({
  _id: false,
  id: {
    type: Number,
    required: true,
    min: 1
  },
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  lines: {
    type: [
      {
        type: String,
        maxlength: 200
      }
    ],
    required: true
  }
})

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 50
  },
  sections: {
    type: [sectionSchema],
    required: true,
  }
})

songSchema.set('toJSON', {
  transform: (doc, song) => {
    song.id = song._id.toString()
    // song.sections = song.sections.map(s => {
    //   console.log('S before:', s)
    //   let editedS = { ...s }
    //   editedS.id = s._id.toString()
    //   delete editedS._id
    //   console.log('S after:', editedS)
    //   return editedS
    // })
    delete song._id
    delete song.__v
  }
})

module.exports = mongoose.model('Song', songSchema)
