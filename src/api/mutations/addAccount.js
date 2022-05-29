// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const ADD_ACCOUNT = gql`
  mutation($name: String!, $username: String!, $password: String!, $email: String!) {
    addAccount(AddAccountInput:{
      name: $name
      username: $username
      password: $password
      email: $email
    }) {
      id
      email
      username
      role
      name
      createdAt
      updatedAt
    }
  }
`
