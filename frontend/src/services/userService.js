import axios from 'axios'
const url = '/api/users'

const signup = async (username, password) => {
  const res = await axios.post(url, { username, password })
  return res.data
}

const usernameAvailable = async (username) => {
  const res = await axios.post(url + '/username-available', { username })
  return res.data
}

export default { signup, usernameAvailable }