// Dependencies
import { gql } from 'apollo-boost'

// Mutation
export const UPDATE_SONG = gql`
  mutation(
    $id: String!,
    $title: String!,
    $writter: String!,
    $tone: String!,
    $body: String!,
    $category: String!,
    $isPublic: Boolean!
  ) {
    updateSong(UpdateSongInput: {
      id: $id
      title: $title
      tone: $tone
      writter: $writter
      body: $body
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
