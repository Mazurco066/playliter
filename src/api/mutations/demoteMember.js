// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const DEMOTE_BAND_MEMBER = gql`
  mutation($band: String!, $member: String!) {
    demoteBandMember(DemoteMemberInput: {
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
