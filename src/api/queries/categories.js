// Dependencies
import { gql } from 'apollo-boost'

// Query
export const CATEGORIES = gql`
  query($id: String!) {
    categories(ListCategoriesInput: {
      bandId: $id
      limit: 0
      offset: 0
    }) {
      id
      title
      description
      band {
        id
        title
        description
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
    }
  }
`
