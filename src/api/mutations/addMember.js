// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const ADD_BAND_MEMBER = gql`
  mutation($band: String!, $member: String!) {
    addBandMember(AddMemberInput: {
      bandId: $band
      accountId: $member
    }) {
      id
      title
      description
      createdAt
      updatedAt
    }
  }
`
