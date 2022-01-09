// Dependencies
import { gql } from 'apollo-boost'

// Query
export const SONG = gql`
  query($band: String!, $id: String!) {
    song(LoadSongByIdInput: {
      id: $id
      bandId: $band
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
