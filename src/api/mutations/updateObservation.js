// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const UPDATE_OBSERVATION = gql`
  mutation($id: String!, $show: String!, $title: String!, $data: String!) {
    updateObservation(UpdateObservationInput: {
      id: $id
      show: $show
      title: $title
      data: $data
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
