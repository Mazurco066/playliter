// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const RESPOND_INVITE = gql`
  mutation($inviteId: String!, $response: String!) {
    respondInvite(RespondInviteInput:{
      inviteId: $inviteId,
      response: $response
    }) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`
