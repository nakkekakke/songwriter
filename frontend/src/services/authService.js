import axios from 'axios'
const url = '/api/token'

const authenticate = async (username, password) => {
  const res = await axios.post(url, { username, password })
  return res.data
}

export default { authenticate }