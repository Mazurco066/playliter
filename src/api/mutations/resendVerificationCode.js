// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const RESEND_VERIFICATION_CODE = gql`
  mutation {
    resendVerificationCode {
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
