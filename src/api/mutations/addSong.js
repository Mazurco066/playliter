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
    $category: String!,
    $isPublic: Boolean!
  ) {
    addSong(AddSongInput: {
      title: $title
      writter: $writter
      tone: $tone
      body: $body
      band: $band
      category: $category
      isPublic: $isPublic
    }) {
      id
      title
      writter
      tone
      body
      isPublic
      createdAt
      updatedAt
    }
  }
`
