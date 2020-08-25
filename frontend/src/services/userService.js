import axios from 'axios'
import { getAuthHeader } from '../helpers/auth'
const url = '/api/users'

const getAuthConfig = () => {
  return { headers: getAuthHeader() }
}

const create = async (username, password) => {
  const res = await axios.post(url, { username, password })
  return res.data
}

const usernameAvailable = async (username) => {
  const res = await axios.post(url + '/username-available', { username })
  return res.data
}

const editSongs = async (username, songs) => {
  const songIds = songs.map(s => s.id)
  const res = await axios.put(url + '/songs', { username, songIds } , getAuthConfig())
  return res.data
}

export default { create, usernameAvailable, editSongs }