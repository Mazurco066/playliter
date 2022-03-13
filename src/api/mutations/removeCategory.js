// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const REMOVE_CATEGORY = gql`
  mutation($id: String!) {
    removeCategory(RemoveCategoryByIdInput:{ id: $id }) {
      id
    }
  }
`
