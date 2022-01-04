// Dependencies
import { graphqlClient } from '../../api'
import { AUTHENTICATE } from '../../api/mutations'
import { asyncHandler } from '../../utils'

// Object initial state
const initialState = () => ({
  authorization: null,
  loading: false
})

// State object
const state = initialState()

// Getter object
const getters = {
  getLoadingStatus(state) {
    return state.loading
  },
  getAuthorization(state) {
    return state.authorization
  }
}

// Actions
const actions = {
  async authenticateByUsername({ commit }, { username, password }) {
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: AUTHENTICATE,
        variables: { username, password }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.authenticate,
      message: error ? resp.message : null
    }
  }
}

// Mutations
const mutations = {
  reset(state) {
    const newState = initialState()
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  },
  setLoading(state, data) {
    state.loading = data
  },
  setAuthorization(state, data) {
    state.authorization = data
  }
}

// Exporting store module
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
