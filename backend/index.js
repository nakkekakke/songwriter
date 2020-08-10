const express = require('express')
const app = express()

const cors = require('cors')

let songs =
  [
    {
      'id': 1,
      'title': 'Test songggeagage',
      'sections': [
        {
          'id': 1,
          'name': 'Verse 1',
          'lines': [
            'Verse 1 line 1 lyrics.',
            'Verse 1 line 2 lyrics...',
            'Verse 1 line 3 lyrics....',
            'Verse 1 line 4 lyrics!!!!'
          ]
        },
        {
          'id': 2,
          'name': 'Chorus 1',
          'lines': [
            'Chorus 1 line 1 lyrics..',
            'Chorus 1 line 2 lyrics...',
            'Chorus 1 line 3 lyrics....',
            'Chorus 1 line 4 lyrics!!!!'
          ]
        },
        {
          'id': 3,
          'name': 'Chorus 2',
          'lines': [
            'Chorus 2 line 1 lyrics..',
            'Chorus 2 line 2 lyrics...',
            'Chorus 2 line 3 lyrics....',
            'Chorus 2 line 4 lyrics!!!!'
          ]
        },
        {
          'id': 5,
          'name': 'Verse 3',
          'lines': [
            'Hahhee',
            'ha',
            'ah',
            'a'
          ]
        },
        {
          'id': 6,
          'name': 'New section',
          'lines': []
        },
        {
          'id': 4,
          'name': 'Verse 2',
          'lines': [
            'Some lines here',
            'haha ha!'
          ]
        }
      ]
    },
    {
      'id': 2,
      'title': 'Test song 2',
      'sections': [
        {
          'id': 1,
          'name': 'Verse 1',
          'lines': [
            'Verse 1 line 1 lyrics.',
            'Verse 1 line 2 lyrics...',
            'Verse 1 line 3 lyrics....',
            'Verse 1 line 4 lyrics!!!!',
            'Line5',
            'Line6',
            'Line7',
            'Line8'
          ]
        },
        {
          'id': 2,
          'name': 'Chorus 1',
          'lines': [
            'Chorus 1 line 1 lyrics..',
            'Chorus 1 line 2 lyrics...',
            'Chorus 1 line 3 lyrics....',
            'Chorus 1 line 4 lyrics!!!!'
          ]
        }
      ]
    },
    {
      'title': 'Uus biisi',
      'sections': [
        {
          'id': 4,
          'name': 'Jokke 1',
          'lines': [
            'hahha',
            'haehahea'
          ]
        },
        {
          'id': 1,
          'name': 'Verse 112',
          'lines': [
            'hee',
            'hahah',
            'haaa'
          ]
        },
        {
          'id': 5,
          'name': 'Jokke 2',
          'lines': [
            'hehhe',
            'hoo',
            'huuhea',
            'hyhyy'
          ]
        }
      ],
      'id': 3
    },
    {
      'title': 'New song',
      'sections': [
        {
          'id': 1,
          'name': 'New section',
          'lines': []
        }
      ],
      'id': 4
    }
  ]

const getNewId = () => {
  const maxId = songs.map(s => s.id).reduce((max, current) => current > max ? current : max)
  console.log('Max id:', maxId)
  return maxId + 1
}

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

const url = '/api/songs/'

app.get(url +':id', (req, res) => {
  const id = Number(req.params.id)
  console.log('Server get /api/songs/' + id)
  const song = songs.find(s => s.id === id)
  res.json(song)
})

app.get(url, (req, res) => {
  console.log('Server get /api/songs')
  res.json(songs)
})

app.post(url, (req, res) => {
  console.log('Server post /api/songs:', req.body)
  const song = { ...req.body, id: getNewId() }
  songs.push(song)
  res.send(song)
})

app.put(url + ':id', (req, res) => {
  const id = Number(req.params.id)
  console.log('Server put /api/songs/' + id)
  console.log('Incoming song:', req.body)
  const song = req.body
  songs = songs.map(s => s.id === id ? song : s)
  console.log('New songs:', songs)
  res.send(song)
})

app.delete(url + ':id', (req, res) => {
  const id = Number(req.params.id)
  console.log('Server delete /api/songs/' + id)
  const song = songs.find(s => s.id === id)
  songs = songs.filter(s => s.id !== id)
  res.send(song)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('Server running on port', PORT)
})

