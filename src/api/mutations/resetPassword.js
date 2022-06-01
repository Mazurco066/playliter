// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const RESET_PASSWORD = gql`
  mutation($accountId: String!, $token: String!, $newPassword: String!) {
    resetPassword(ResetPasswordInput: {
      accountId: $accountId
      token: $token
      newPassword: $newPassword
    }) {
      id
      name
      username
      email
      role
      createdAt
      updatedAt
    }
  }
`
