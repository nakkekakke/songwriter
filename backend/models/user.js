const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type:  String,
    unique: true
  },
  password: String,
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Song'
    }
  ]
})

userSchema.plugin(uniqueValidator) // ValidationError

userSchema.set('toJSON', {
  transform: (doc, user) => {
    user.id = user._id.toString()
    delete user._id
    delete user.__v
  }
})

module.exports = mongoose.model('User', userSchema)
