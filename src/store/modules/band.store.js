// Dependencies
import { getAuthenticatedClient } from '../../api'
import { asyncHandler } from '../../utils'
import { BAND, BANDS } from '../../api/queries'

// Object initial state
const initialState = () => ({ loading: false })

// State object
const state = initialState()

// Getter object
const getters = {
  getLoadingStatus(state) {
    return state.loading
  }
}

// Actions
const actions = {
  async loadBand({ commit }, id) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: BAND,
        variables: { id }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.band,
      message: error ? resp.message : null
    }
  },
  async loadBands({ commit }, { limit = '0', offset = '0' }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: BANDS,
        variables: { limit, offset }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.bands,
      message: error ? resp.message : null
    }
  }
}

// Mutations
const mutations = {
  reset(state) {
    const newState = initialState();
    Object.keys(newState).forEach(key => {
      state[key] = newState[key]
    })
  },
  setLoading(state, data) {
    state.loading = data
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
