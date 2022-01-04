// Dependencies
import ApolloClient, { InMemoryCache } from 'apollo-boost'

// GraphQL Host location
const endpoint = process.env.VUE_APP_API_BASE_URL

// Graphql client instance
export const graphqlClient = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache()
})

// import axios from 'axios'
// import store from '../store'
// import router from '../router'

// const httpClient = axios.create({
//   baseURL: process.env.VUE_APP_API_BASE_URL
// })

// httpClient.interceptors.request.use(async config => {
//   const token = store.getters['authentication/getAuthorization']
//   config.headers = {
//     ...config.headers,
//     'Authorization': token ? `Bearer ${token}` : ''
//   }
//   return config
// })

// httpClient.interceptors.response.use(
//   response => {
//     return response
//   }, 
//   error => {
//     const response = error.response
//     const token = store.getters['authentication/getAuthorization']
//     if (token && response && response.status === 401) {
//       store.dispatch('RESET')
//       router.push('/')
//     }
//     throw error 
//   }
// )

// export default httpClient
