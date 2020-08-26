import React from 'react'
import Chord from '../components/songs/Chord'
import reactStringReplace from 'react-string-replace'

const linesArrayToString = (lines) => {
  let string = ''
  for (let i = 0; i < lines.length; i++) {
    string = string.concat(lines[i])
    if (i + 1 < lines.length) {  // If it's not the last line, add a newline
      string = string.concat('\n')
    }
  }
  return string
}

const linesStringToArray = (string) => {
  const array = cutStringIntoLines(string)
  //.map(line => line = line.trim())
  //.filter(line => line !== '')

  //console.log('Trimmed lines:', array)
  return array
}

const validateLines = (array) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i].length > 200) {
      return false
    }
  }
  return true
}

const lineCount = (string) => {
  return cutStringIntoLines(string).size
}

const cutStringIntoLines = (string) => {
  //console.log('Cutting:', string)
  const cutLines = string.match(/[^\r\n]+/g)
  return cutLines ? cutLines : []
}

const getDefaultSong = (user) => {
  return {
    title: 'New song',
    sections: [
      getDefaultSection()
    ],
    username: user ? user.username : null
  }
}

const getDefaultSection = () => {
  return {
    id: 1,
    name: 'New section',
    lines: []
  }
}

const createNewSectionId = (song) => {
  if (song.sections.length === 0) {
    return 1
  }
  let maxId = song.sections.map(s => s.id).reduce((max, current) => current > max ? current : max) // Find the previously highest section id
  return maxId + 1
}

const createNewSection = (song) => {
  if (song.sections.length === 0) {
    return getDefaultSection()
  }

  const newSection = {
    ...getDefaultSection(),
    id: createNewSectionId(song),
  }

  return newSection
}

const addNewSection = (song) => {
  const newSection = createNewSection(song)
  song.sections.push(newSection) // modifies the song directly
  return song
}

const cloneAndAddSection = (song, section) => {
  const newSection = { ...section, id: createNewSectionId(song) }
  return { ...song, sections: [...song.sections, newSection] }
}

const addChordsToLine = (rawLine) => {
  const rawChords = rawLine.match(/\[([^\]]+)\]/gm)
  let line = rawLine.replace(/ /g, '\u00a0')
  if (rawChords) {
    for (let i = 0; i < rawChords.length; i++) {
      line = reactStringReplace(line, rawChords[i], (match, index) => {
        return <Chord key={rawChords[i] + index} chordString={match.substring(1, match.length - 1)} />
      })
    }
  }
  return line
}



export default {
  linesArrayToString,
  linesStringToArray,
  lineCount,
  getDefaultSong,
  addNewSection,
  createNewSection,
  cloneAndAddSection,
  validateLines,
  addChordsToLine
}