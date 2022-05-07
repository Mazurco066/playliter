// Dependencies
import { gql } from 'apollo-boost'

// Query
export const PUBLIC_SONGS = gql`
  query($filter: String!, $limit: Float!, $offset: Float!) {
    publicSongs(ListPublicSongsInput: {
      filter: $filter,
      offset: $offset,
      limit: $limit
    }) {
      id
      title
      writter
      tone
      body
      band {
        id
        title
        description
        createdAt
        updatedAt
      }
      category {
        id
        title
        description
        createdAt
        updatedAt
      }
      isPublic
      createdAt
      updatedAt
    }
  }
`
