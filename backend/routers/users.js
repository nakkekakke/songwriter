const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const Song = require('../models/song')
const userService = require('../services/userService')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

userRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('songs', { _id: 1, title: 1 })
    res.json(users.map(u => u.toJSON()))
  } catch (error) {
    next(error)
  }
})

userRouter.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).populate('songs')
    user ? res.json(user.toJSON()) : res.status(404).end()
  } catch (error) {
    next(error)
  }
})

userRouter.post('/', async (req, res, next) => {
  const pwHash = await bcrypt.hash(req.body.password, 10)

  const userToSave = new User({
    username: req.body.username,
    password: pwHash,
    songs: []
  })

  try {
    const savedUser = await userToSave.save()
    const token = jwt.sign({ username: savedUser.username, id: savedUser._id }, config.JWT_SECRET, { expiresIn: '1h' })
    res.status(200).send({ token, username: savedUser.username })
  } catch (error) {
    next(error)
  }
})

// Edit/reorder user's song list
userRouter.put('/songs', async (req, res, next) => {
  try {
    const songIds = req.body.songIds
    const username = req.body.username
    if (await userService.verifySongs(username, songIds)) {
      let songs = []
      await asyncForEach(songIds, async s => {
        const song = await Song.findOne({ _id: s })
        songs = songs.concat(song)
      })
      const updatedUser = await User.findOneAndUpdate({ username }, { songs: songs }, { new: true, useFindAndModify: false, runValidators: true })
      updatedUser ? res.status(200).json(updatedUser.toJSON()) : res.status(404).end()
    } else {
      res.status(409).send({ error: 'Client song list differs from server.' })
    }
  } catch (error) {
    next(error)
  }
})

userRouter.post('/username-available', async (req, res, next) => {
  const username = req.body.username
  try {
    const found = await User.findOne({ username })
    return found ? false : true
  } catch (error) {
    next(error)
  }
})

const asyncForEach = async (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    await callback(array[i])
  }
}

module.exports = userRouter
