const songRouter = require('express').Router()
const Song = require('../models/song')
const User = require('../models/user')

songRouter.get('/:id', async (req, res, next) => {
  try {
    const song = await Song.findById(req.params.id)
    song ? res.json(song.toJSON()) : res.status(404).end()
  } catch (error) {
    next(error)
  }
})

songRouter.get('/', async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.user.id }).populate('songs')
    res.json(user.songs.map(s => s.toJSON()))
  } catch (error) {
    next(error)
  }
})

songRouter.post('/', async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username })
    if (user) {
      const song = await Song.create({ ...req.body, user: user._id })
      user.songs = user.songs.concat(song._id)
      await user.save()
      res.json(song)
    } else {
      const error = new Error('Invalid user')
      error.name = 'UserError'
      throw error
    }
  } catch (error) {
    next(error)
  }
})

songRouter.put('/:id', async (req, res, next) => {
  try {
    const updatedFields = { title: req.body.title, sections: req.body.sections }
    const song = await Song.findByIdAndUpdate(req.params.id, updatedFields, { new: true, useFindAndModify: false, runValidators: true })
    song ? res.status(200).json(song.toJSON()) : res.status(404).end()
  } catch (error) {
    next(error)
  }
})

songRouter.delete('/:id', async (req, res, next) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id)
    const user = await User.findById(song.user)
    user.songs = user.songs.filter(s => s.toString() !== song._id.toString())
    await user.save()
    res.json(song)
  } catch (error) {
    next(error)
  }
})

module.exports = songRouter