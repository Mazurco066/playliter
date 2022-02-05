// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const UPDATE_PROFILE = gql`
  mutation($id: String!, $name: String!) {
    updateAccount(UpdateAccountInput: {
      id: $id
      name: $name
      oldPassword: ""
      password: ""
      confirmPassword: ""
    }) {
      id
      username
      role
      name
      createdAt
      updatedAt
    }
  }
`
