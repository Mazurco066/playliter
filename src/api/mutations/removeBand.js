// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const REMOVE_BAND = gql`
  mutation($id: String!) {
    removeBand(RemoveBandByIdInput: { id: $id }) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`


