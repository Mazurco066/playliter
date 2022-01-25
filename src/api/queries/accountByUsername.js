// Dependencies
import { gql } from 'apollo-boost'

// Query
export const ACCOUNT_BY_USERNAME = gql`
  query($username: String!) {
    accountByEmail(LoadAccountByEmailInput: { username: $username }) {
      id
      name
      username
      role
      createdAt
      updatedAt
    }
  }
`
