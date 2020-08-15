const songRouter = require('express').Router()
const Song = require('../models/song')
//const songService = require('../services/songService')

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
    const songs = await Song.find({})
    res.json(songs.map(s => s.toJSON()))
  } catch (error) {
    next(error)
  }
})

songRouter.post('/', async (req, res, next) => {
  try {
    const song = await Song.create(req.body)
    res.json(song)
  } catch (error) {
    next(error)
  }
})

songRouter.put('/:id', async (req, res, next) => {
  try {
    const song = await Song.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(song)
  } catch (error) {
    next(error)
  }
})

songRouter.delete('/:id', async (req, res, next) => {
  try {
    const song = await Song.findByIdAndDelete(req.params.id)
    res.json(song)
  } catch (error) {
    next(error)
  }
})

module.exports = songRouter