// Dependencies
import { gql } from 'apollo-boost'

// Query
export const ACCOUNT_SHOWS = gql`
  query {
    accountShows {
      id
      title
      description
      band {
        id
        title
        description
        createdAt
        updatedAt      
      }
      date
      songs {
        id
        title
        writter
        tone
        body
        isPublic
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
