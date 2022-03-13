// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const UPDATE_SHOW = gql`
  mutation($title: String!, $description: String!, $id: String!, $date: String!) {
    updateShow(UpdateShowInput: {
      id: $id
      title: $title
      description: $description
      date: $date
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
