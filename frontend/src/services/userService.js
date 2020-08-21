import axios from 'axios'
const url = '/api/users'

const signup = async (username, password) => {
  const res = await axios.post(url, { username, password })
  return res.data
}

export default { signup }