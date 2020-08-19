import axios from 'axios'
import { getAuthHeader } from '../helpers/auth'
const url = '/api/songs/'

const getAuthConfig = () => {
  return { headers: getAuthHeader() }
}

const getAll = async () => {
  console.log('Getting songs...')
  console.log('header:', getAuthConfig())
  const res = await axios.get(url, getAuthConfig())
  return res.data
}

const getOne = async (id) => {
  const res = await axios.get(url + id, getAuthConfig())
  return res.data
}

const create = async (songObject) => {
  console.log('Creating new song...')
  const res = await axios.post(url, songObject, getAuthConfig())
  return res.data
}

const edit = async (songObject) => {
  const res = await axios.put(url + songObject.id, songObject, getAuthConfig())
  return res.data
}

const destroy = async (id) => {
  console.log('Deleting song with id:', id)
  const res = await axios.delete(url + id, getAuthConfig())
  return res.data
}

export default { getAll, getOne, create, edit, destroy }