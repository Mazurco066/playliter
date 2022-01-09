// Dependencies
import { gql } from 'apollo-boost'

// Query
export const CATEGORIES = gql`
  query($id: String!, $limit: Number!, $offset: Number!) {
    categories(ListCategoriesInput: {
      limit: $offset,
      offset: $limit,
      bandId: $id
    }) {
      id
      title
      description
      band {
        id
        title
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
