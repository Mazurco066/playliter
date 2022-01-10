// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const ADD_SHOW = gql`
  mutation($title: String!, $description: String!, $band: String!) {
    addShow(AddShowInput: {
      title: $title
      description: $description
      band: $band
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
