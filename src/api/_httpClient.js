// Dependencies
import axios from 'axios'
import store from '../store'
import router from '../router'

// Base http client
const httpClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
})

// Add auth token to request by interceptors
httpClient.interceptors.request.use(async config => {
  const token = store ? store.getters['authentication/getAuthorization'] : null
  config.headers = {
    ...config.headers,
    'Authorization': token ? `Bearer ${token}` : ''
  }
  return config
})

// Verify if API returned unauthorized response
httpClient.interceptors.response.use(
  response => {
    return response
  }, 
  error => {
    const response = error.response
    const token = store ? store.getters['authentication/getAuthorization'] : null
    if (token && response && response.status === 401) {
      store.dispatch('RESET')
      router.push({ name: 'signin' })
    }
    throw error 
  }
)

// Exporting http client
export default httpClient
