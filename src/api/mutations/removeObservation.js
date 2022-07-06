// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const REMOVE_OBSERVATION = gql`
  mutation($id: String!, $show: String!) {
    removeObservation(RemoveObservationInput: {
      id: $id
      show: $show
    }) {
      id
      title
      date
      songs
      band
      observations {
        id
        title
        data
      }
      createdAt
      updatedAt
    }
  }
`
