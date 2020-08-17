const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (req, res, next) => {
  console.log('user:', req.user)
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
    console.log('Saved:', savedUser)
    res.json(savedUser)
  } catch (error) {
    next(error)
  }
})

module.exports = userRouter
