// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const AUTHENTICATE = gql`
  mutation($username: String!, $password: String!) {
    authenticate(AuthenticateInput: {
      username: $username,
      password: $password
    }) { token }
  }
`
