// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const ADD_BAND = gql`
  mutation($title: String!, $description: String!) {
    addBand(AddBandInput: {
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
