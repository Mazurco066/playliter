// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const ADD_SHOW = gql`
  mutation($title: String!, $description: String!, $band: String!, $date: String!) {
    addShow(AddShowInput: {
      title: $title
      description: $description
      band: $band
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
