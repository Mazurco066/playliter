// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const UPDATE_BAND = gql`
  mutation($id: String!, $title: String!, $description: String!) {
    updateBand(UpdateBandInput: {
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
