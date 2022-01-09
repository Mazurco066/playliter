// Dependencies
import { gql } from 'apollo-boost'

// Query
export const SONGS = gql`
  query($id: String!, $limit: Float!, $offset: Float!) {
    songs(ListSongsInput:{
      bandId: $id,
      limit: $limit,
      offset: $offset
    }) {
      id
      title
      writter
      tone
      body
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
`
