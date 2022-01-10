// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const UNLINK_SONG = gql`
  mutation($song: String!, $show: String!) {
    unlinkSong(UnlinkSongInput: {
      showId: $show
      songId: $song
    }) {
      id
      title
      description
      band
      songs
      createdAt
      updatedAt
    }
  }
`
