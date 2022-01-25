// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const REMOVE_BAND_MEMBER = gql`
  mutation($band: String!, $member: String!) {
    removeBandMember(RemoveMemberInput: {
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
