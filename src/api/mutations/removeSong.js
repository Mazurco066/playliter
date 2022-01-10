// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const REMOVE_SONG = gql`
  mutation($id: String!) {
    removeSong(RemoveSongByIdInput:{
      id: $id
    }) {
      id
    }
  }
`
