import axios from 'axios'
const url = 'http://localhost:3001/songs'

const getAll = async () => {
  console.log('Getting songs...')
  const res = await axios.get(url)
  return res.data
}

const getOne = async (id) => {
  const res = await axios.get(url + '/' + id)
  return res.data
}

const create = async (songObject) => {
  console.log('Creating new song...')
  const res = await axios.post(url, songObject)
  return res.data
}

const edit = async (songObject) => {
  console.log('Editing song: ', songObject)
  const res = await axios.put(url + '/' + songObject.id, songObject)
  return res.data
}

const destroy = async (id) => {
  console.log('Deleting song with id:', id)
  const res = await axios.delete(url + '/' + id)
  return res.data
}

export default { getAll, getOne, create, edit, destroy }