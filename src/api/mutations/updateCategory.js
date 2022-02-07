// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const UPDATE_CATEGORY = gql`
  mutation($title: String!, $description: String!, $id: String!) {
    updateCategory(UpdateCategoryInput: {
      id: $id
      title: $title
      description: $description
    }) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`
