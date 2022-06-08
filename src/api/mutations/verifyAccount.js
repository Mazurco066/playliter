// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const VERIFY_ACCOUNT = gql`
  mutation($code: String!) {
    verifyAccount(VerifyAccountInput: {
      code: $code
    }) {
      id
      name
      username
      email
      role
      isEmailconfirmed
      createdAt
      updatedAt
    } 
  }
`
