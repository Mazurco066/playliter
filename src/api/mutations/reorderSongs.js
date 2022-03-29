// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const REORDER_SONGS = gql`
  mutation($id: String!, $songs: [String!]!) {
    reorderShow(ReorderShowInput: {
      id: $id
      songs: $songs
    }) {
      id
      title
      description
      band
      date
      songs
      createdAt
      updatedAt
    }
  }
`
