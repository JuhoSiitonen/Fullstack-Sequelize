import axios from '../util/apiClient'
const baseUrl = '/api/logout'

const logout = async () => {
  const response = await axios.delete(baseUrl)
  return response.data
}

export default { logout }