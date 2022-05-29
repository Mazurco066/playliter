// Dependencies
import { gql } from 'apollo-boost'

// Query
export const ME = gql`
  query {
    me { 
      id
      avatar
      name
      username
      role
      createdAt
      updatedAt
    }
  }
`
