// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const ADD_SONG = gql`
  mutation(
    $title: String!,
    $writter: String!,
    $tone: String!,
    $body: String!,
    $band: String!,
    $category: String!
  ) {
    addSong(AddSongInput: {
      title: $title
      writter: $writter
      tone: $tone
      body: $body
      band: $band
      category: $category
    }) {
      id
      title
      writter
      tone
      body
      createdAt
      updatedAt
    }
  }
`
