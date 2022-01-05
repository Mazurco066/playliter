// Dependencies
import { gql } from 'apollo-boost'

// Query
export const ME = gql`
  query {
    me { 
      id
      name
      username
      role
      createdAt
      updatedAt
    }
  }
`
