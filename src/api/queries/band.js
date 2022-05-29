// Dependencies
import { gql } from 'apollo-boost'

// Query
export const BAND = gql`
  query($id: String!) {
    band(LoadBandByIdInput: { id: $id }) {
      id
      title
      description
      owner {
        id
        name
        role
        username
        createdAt
        updatedAt
      }
      members {
        id
        avatar
        email
        name
        role
        username
        createdAt
        updatedAt
      }
      admins {
        id
        name
        role
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
