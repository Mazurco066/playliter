// Dependencies
import axios from 'axios'
import store from '../store'

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
httpClient.interceptors.response.use(async response => {
  const token = store ? store.getters['authentication/getAuthorization'] : null
  if (token && [401].includes(response.status)) {
    // Redirect to sign in
    console.log('[Unauthorized]')
  }
  return response
})

// Exporting http client
export default httpClient
