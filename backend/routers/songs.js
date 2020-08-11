const songRouter = require('express').Router()
const Song = require('../models/song')
//const songService = require('../services/songService')

songRouter.get('/:id', (req, res) => {
  Song.findById(req.params.id)
    .then(song => {
      song ? res.json(song.toJSON()) : res.status(404).end()
    })
    .catch(error => {
      console.log(error)
    })
})

songRouter.get('/', (req, res) => {
  console.log('Server get /api/songs')
  Song.find({})
    .then(songs => {
      res.json(songs.map(s => s.toJSON()))
    })
    .catch(error => {
      console.log(error)
    })
})

songRouter.post('/', (req, res) => {
  console.log('Server post /api/songs:', req.body)
  Song.create(req.body)
    .then(song => {
      console.log('Created:', song)
      res.json(song)
    })
    .catch(error => {
      console.log(error)
    })
})

songRouter.put('/:id', (req, res) => {
  console.log('NODE: Incoming song:', req.body)
  Song.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(song => {
      console.log('NODE: Updated song:', song)
      res.json(song)
    })
    .catch(error => {
      console.log(error)
    })
})

songRouter.delete('/:id', (req, res) => {
  Song.findByIdAndDelete(req.params.id)
    .then(song => {
      console.log('Deleted song:', song)
      res.json(song)
    })
    .catch(error => {
      console.log(error)
    })
})

module.exports = songRouter