// Dependencies
import { gql } from 'apollo-boost'

// Query
export const SHOW = gql`
  query($band: String!, $id: String!) {
    show(LoadShowByIdInput: {
      id: $id
      bandId: $band
    }) {
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
      songs {
        id
        title
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
