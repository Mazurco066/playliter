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
      date
      band {
        id
        title
        description
        createdAt
        updatedAt
      }
      observations {
        id
        title
        data
      }
      songs {
        id
        title
        tone
        body
        isPublic
        writter
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
