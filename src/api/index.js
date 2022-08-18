// API Modules
import * as accounts from './account'
import * as auth from './auth'
import * as bands from './band'
import * as categories from './category'
import * as helpers from './helper'
import * as shows from './show'
import * as songs from './song'

// API async request handler for axios
export const asyncRequestHandler = async promise => {
  try {
    return await promise
  } catch ({ response }) {
    return response
  }
}

// Join API modules
export default {
  accounts,
  auth,
  bands,
  categories,
  helpers,
  shows,
  songs
}
