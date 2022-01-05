// Dependencies
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import store from '../store'

// GraphQL Host location
const endpoint = process.env.VUE_APP_API_BASE_URL

// Graphql client instance
export const graphqlClient = new ApolloClient({
  uri: endpoint,
  cache: new InMemoryCache()
})

export function getAuthenticatedClient() {
  const token = store ? store.getters['authentication/getAuthorization'] : null
  const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache(),
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
  return client
}
