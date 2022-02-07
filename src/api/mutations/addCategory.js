// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const ADD_CATEGORY = gql`
  mutation($title: String!, $description: String!, $band: String!) {
    addCategory(AddCategoryInput:{
      title: $title
      description: $description
      band: $band
    }) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`
