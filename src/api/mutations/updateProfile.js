// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const UPDATE_PROFILE = gql`
  mutation($id: String!, $name: String!, $avatar: String!, $email: String!) {
    updateAccount(UpdateAccountInput: {
      id: $id
      avatar: $avatar
      name: $name
      email: $email
      oldPassword: ""
      password: ""
      confirmPassword: ""
    }) {
      id
      avatar
      email
      username
      role
      name
      createdAt
      updatedAt
    }
  }
`
