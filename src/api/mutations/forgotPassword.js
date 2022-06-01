// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const FORGOT_PASSWORD = gql`
  mutation($email: String!) {
    forgotPassword(ForgotPasswordInput: {
      email: $email
    }) {
      token
    }
  }
`
