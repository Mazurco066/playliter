// Dependencies
import { getAuthenticatedClient } from '../../api'
import { asyncHandler } from '../../utils'
import { BAND, BANDS } from '../../api/queries'
import {
  ADD_BAND,
  ADD_BAND_MEMBER,
  DEMOTE_BAND_MEMBER,
  PROMOTE_BAND_MEMBER,
  REMOVE_BAND_MEMBER,
  REMOVE_BAND,
  UPDATE_BAND
} from '../../api/mutations'

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
  async saveBand({ commit }, { payload, id = null }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: id ? UPDATE_BAND : ADD_BAND,
        variables: id ? { ...payload, id } : { ...payload }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : id ? resp.data.updateBand : resp.data.addBand,
      message: error ? resp.message : null
    }
  },
  async addBandMember({ commit }, { band, member }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: ADD_BAND_MEMBER,
        variables: { band, member }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.addBandMember,
      message: error ? resp.message : null
    }
  },
  async demoteBandMember({ commit }, { band, member }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: DEMOTE_BAND_MEMBER,
        variables: { band, member }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.demoteBandMember,
      message: error ? resp.message : null
    }
  },
  async promoteBandMember({ commit }, { band, member }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: PROMOTE_BAND_MEMBER,
        variables: { band, member }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.promoteBandMember,
      message: error ? resp.message : null
    }
  },
  async removeBandMember({ commit }, { band, member }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: REMOVE_BAND_MEMBER,
        variables: { band, member }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.removeBandMember,
      message: error ? resp.message : null
    }
  },
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
  },
  async removeBand({ commit }, id) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: REMOVE_BAND,
        variables: { id }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.removeBand,
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
