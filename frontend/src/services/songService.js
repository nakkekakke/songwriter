import axios from 'axios'
const url = 'http://localhost:3001/songs'

const getAll = () => {
  console.log('Getting songs...')
  const req = axios.get(url)
  return req.then(res => res.data)
}

const getOne = (id) => {
  const req = axios.get(url + '/' + id)
  return req.then(res => res.data)
}

const create = (songObject) => {
  console.log('Creating new song...')
  const req = axios.post(url, songObject)
  return req.then(res => res.data)
}

export default { getAll, getOne, create }