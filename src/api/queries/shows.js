// Dependencies
import { gql } from 'apollo-boost'

// Query
export const SHOWS = gql`
  query($id: String!, $limit: Float!, $offset: Float!) {
    shows(ListShowsInput: {
      limit: $limit
      offset: $offset
      bandId: $id
    }) {
      id
      title
      description
      date
      songs {
        id
        title
        tone
        body
        writter
        createdAt
        updatedAt
      }
      observations {
        id
        title
        data
      }
      band {
        id
        title
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
