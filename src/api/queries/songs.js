// Dependencies
import { gql } from 'apollo-boost'

// Query
export const SONGS = gql`
  query($id: String!, $limit: Float!, $offset: Float!, $filter: String!) {
    songs(ListSongsInput:{
      bandId: $id,
      limit: $limit,
      offset: $offset,
      filter: $filter
    }) {
      total
      data {
        id
        title
        writter
        tone
        body
        isPublic
        category {
          id
          title
          description
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
        band {
          id
          title
          description
          createdAt
          updatedAt
        }
      }
    }
  }
`
