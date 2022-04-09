// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const SCRAP_SONG = gql`
  mutation ($url: String!) {
    scrapSong(ScrapSongInput:{ 
      url: $url 
    }) { 
      loot 
    }
  }
`
