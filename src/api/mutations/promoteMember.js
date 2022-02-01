// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const PROMOTE_BAND_MEMBER = gql`
  mutation($band: String!, $member: String!) {
    promoteBandMember(PromoteMemberInput: {
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
