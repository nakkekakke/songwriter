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
  const array = cutStringIntoLines(string).map(line => line = line.trim())
  console.log('Trimmed lines:', array)
  return array
}

const lineCount = (string) => {
  return cutStringIntoLines(string).size
}

const cutStringIntoLines = (string) => {
  return string.match(/[^\r\n]+/g)
}

export default { linesArrayToString, linesStringToArray, lineCount, cutStringIntoLines }