// Dependencies
import { getAuthenticatedClient } from '../../api'
import { asyncHandler } from '../../utils'
import { REMOVE_SONG, ADD_SONG, UPDATE_SONG, ADD_CATEGORY, UPDATE_CATEGORY, REMOVE_CATEGORY } from '../../api/mutations'
import { SONG, SONGS, CATEGORIES } from '../../api/queries'

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
  async saveCategory({ commit }, { id = null, payload }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: id ? UPDATE_CATEGORY : ADD_CATEGORY,
        variables: id ? { ...payload, id } : { ...payload }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : id ? resp.data.updateCategory : resp.data.addCategory,
      message: error ? resp.message : null
    }
  },
  async saveSong({ commit }, { id = null, payload }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: id ? UPDATE_SONG : ADD_SONG,
        variables: id ? { ...payload, id } : { ...payload }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : id ? resp.data.updateSong : resp.data.addSong,
      message: error ? resp.message : null
    }
  },
  async loadBandSong({ commit }, { band, id }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: SONG,
        variables: { band, id }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.song,
      message: error ? resp.message : null
    }
  },
  async listBandSongs({ commit }, { limit = 0, offset = 0, band }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: SONGS,
        variables: { limit, offset, id: band }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.songs,
      message: error ? resp.message : null
    }
  },
  async removeBandSong({ commit }, id) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: REMOVE_SONG,
        variables: { id }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.removeSong,
      message: error ? resp.message : null
    }
  },
  async removeCategory({ commit }, id) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: REMOVE_CATEGORY,
        variables: { id }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.removeCategory,
      message: error ? resp.message : null
    }
  },
  async listBandCategories({ commit }, { band }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: CATEGORIES,
        variables: { id: band }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.categories,
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
