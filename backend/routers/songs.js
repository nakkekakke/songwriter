const songRouter = require('express').Router()
const Song = require('../models/song')
//const songService = require('../services/songService')

songRouter.get('/:id', (req, res, next) => {
  Song.findById(req.params.id)
    .then(song => {
      song ? res.json(song.toJSON()) : res.status(404).end()
    })
    .catch(error => {
      next(error)
    })
})

songRouter.get('/', (req, res, next) => {
  Song.find({})
    .then(songs => {
      res.json(songs.map(s => s.toJSON()))
    })
    .catch(error => {
      next(error)
    })
})

songRouter.post('/', (req, res, next) => {
  Song.create(req.body)
    .then(song => {
      res.json(song)
    })
    .catch(error => {
      next(error)
    })
})

songRouter.put('/:id', (req, res, next) => {
  Song.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(song => {
      res.json(song)
    })
    .catch(error => {
      next(error)
    })
})

songRouter.delete('/:id', (req, res, next) => {
  Song.findByIdAndDelete(req.params.id)
    .then(song => {
      res.json(song)
    })
    .catch(error => {
      next(error)
    })
})

module.exports = songRouter