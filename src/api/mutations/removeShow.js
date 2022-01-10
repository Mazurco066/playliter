// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const REMOVE_SHOW = gql`
  mutation($id: String!) {
    removeShow(RemoveShowByIdInput:{
      id: $id
    }), {
      id
      title
      description
      band
      songs
      createdAt
      updatedAt
    }
  }
`
