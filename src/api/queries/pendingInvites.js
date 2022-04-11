// Dependencies
import { gql } from 'apollo-boost'

// Query
export const PENDING_INVITES = gql`
  query {
    pendingInvites {
      id
      account {
        id
        username
        role
        name
        createdAt
        updatedAt
      }
      band {
        id
        title
        description
        createdAt
        updatedAt
      }
      response
      createdAt
      updatedAt
    }
  }
`
