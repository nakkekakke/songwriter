export const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('SongWriterUser'))
  if (user && user.token) {
    return { 'Authorization': `Bearer ${user.token}` }
  }
  return {}
}
