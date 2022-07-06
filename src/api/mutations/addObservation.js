// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const ADD_OBSERVATION = gql`
  mutation($show: String!, $title: String!, $data: String!) {
    addObservation(AddObservationInput: {
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
