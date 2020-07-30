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
    .map(line => line = line.trim())
    .filter(line => line !== '')

  //console.log('Trimmed lines:', array)
  return array
}

const lineCount = (string) => {
  return cutStringIntoLines(string).size
}

const cutStringIntoLines = (string) => {
  //console.log('Cutting:', string)
  const cutLines = string.match(/[^\r\n]+/g)
  return cutLines ? cutLines : []
}

const getDefaultSong = () => {
  return {
    title: 'New song',
    sections: [
      {
        name: 'Section 1',
        lines: []
      }
    ]
  }
}

const addNewSection = (song) => {
  const newSection = {
    name: 'Section ' + (song.sections.length + 1),
    lines: []
  }
  song.sections.push(newSection) // modifies the song directly
}

export default { linesArrayToString, linesStringToArray, lineCount, cutStringIntoLines, getDefaultSong, addNewSection }