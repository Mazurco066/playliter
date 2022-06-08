// Dependencies
import { gql } from 'apollo-boost'

// Query
export const ME = gql`
  query {
    me { 
      id
      avatar
      email
      name
      username
      role
      isEmailconfirmed
      createdAt
      updatedAt
    }
  }
`
