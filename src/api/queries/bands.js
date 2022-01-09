// Dependencies
import { gql } from 'apollo-boost'

// Query
export const BANDS = gql`
  query($limit: String!, $offset: String!) {
    bands(ListBandsInput: { limit: $limit offset: $offset }) {
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
