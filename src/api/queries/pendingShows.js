// Dependencies
import { gql } from 'apollo-boost'

// Query
export const PENDING_SHOW = gql`
  query {
    pendingShows {
      id
      title
      description
      date
      band {
        id
        title
        description
        createdAt
        updatedAt
      }
      songs {
        id
        title
        writter
        tone
        body
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
