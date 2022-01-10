// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const LINK_SONG = gql`
  mutation($song: String!, $show: String!) {
    linkSong(LinkSongInput: {
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
