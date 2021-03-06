// Dependencies
import { getAuthenticatedClient } from '../../api'
import { asyncHandler } from '../../utils'
import {
  ADD_OBSERVATION,
  LINK_SONG,
  UNLINK_SONG,
  ADD_SHOW,
  UPDATE_OBSERVATION,
  UPDATE_SHOW,
  REMOVE_OBSERVATION,
  REMOVE_SHOW,
  REORDER_SONGS
} from '../../api/mutations'
import {
  ACCOUNT_SHOWS,
  PENDING_SHOW,
  SHOW,
  SHOWS
} from '../../api/queries'

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
  async saveShow({ commit }, { payload, id = null, band = null }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: id ? UPDATE_SHOW : ADD_SHOW,
        variables: id ? { ...payload, id } : { ...payload, band }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : id ? resp.data.updateShow : resp.data.addShow,
      message: error ? resp.message : null
    }
  },
  async reorderSongs({ commit }, {  id = null, songs = [] }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: REORDER_SONGS,
        variables: { id, songs: songs.map(({ id }) => id) }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.reorderShow,
      message: error ? resp.message : null
    }
  },
  async removeShow({ commit }, id) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: REMOVE_SHOW,
        variables: { id }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.removeShow,
      message: error ? resp.message : null
    }
  },
  async linkSong({ commit }, { show, song }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: LINK_SONG,
        variables: { show, song }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.linkSong,
      message: error ? resp.message : null
    }
  },
  async unlinkSong({ commit }, { show, song }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: UNLINK_SONG,
        variables: { show, song }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.unlinkSong,
      message: error ? resp.message : null
    }
  },
  async listBandShow({ commit }, { band, id }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: SHOW,
        variables: { band, id }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.show,
      message: error ? resp.message : null
    }
  },
  async listBandShows({ commit }, { limit = 0, offset = 0, band }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: SHOWS,
        variables: { limit, offset, id: band }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.shows,
      message: error ? resp.message : null
    }
  },
  async listPendingShows({ commit }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: PENDING_SHOW,
        variables: {}
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.pendingShows,
      message: error ? resp.message : null
    }
  },
  async listAccountShows({ commit }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: ACCOUNT_SHOWS,
        variables: {}
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.accountShows,
      message: error ? resp.message : null
    }
  },
  async saveObservation({ commit }, { payload, showId }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: payload.id ? UPDATE_OBSERVATION : ADD_OBSERVATION,
        variables: { ...payload, show: showId }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : payload.id ? resp.data.updateObservation : resp.data.addObservation,
      message: error ? resp.message : null
    }
  },
  async removeObservation({ commit }, { showId, observationId }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: REMOVE_OBSERVATION,
        variables: {
          show: showId,
          id: observationId
        }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.removeObservation,
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
