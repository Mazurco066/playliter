// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const UPDATE_PROFILE = gql`
  mutation($id: String!, $name: String!, $avatar: String!) {
    updateAccount(UpdateAccountInput: {
      id: $id
      avatar: $avatar
      name: $name
      oldPassword: ""
      password: ""
      confirmPassword: ""
    }) {
      id
      avatar
      username
      role
      name
      createdAt
      updatedAt
    }
  }
`
