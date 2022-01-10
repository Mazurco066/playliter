// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const UPDATE_SHOW = gql`
  mutation($title: String!, $description: String!, $id: String!) {
    updateShow(UpdateShowInput: {
      id: $id
      title: $title
      description: $description
    }) {
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
