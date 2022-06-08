// Dependencies
import { getAuthenticatedClient } from '../../api'
import { ME, ACCOUNT_BY_USERNAME } from '../../api/queries'
import { UPDATE_PROFILE, ADD_ACCOUNT, VERIFY_ACCOUNT } from '../../api/mutations'
import { asyncHandler } from '../../utils'

// Object initial state
const initialState = () => ({ me: {}, loading: false })

// State object
const state = initialState()

// Getter object
const getters = {
  getLoadingStatus(state) {
    return state.loading
  },
  getMe(state) {
    return state.me
  }
}

// Actions
const actions = {
  async saveAccount({ commit }, { payload }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: ADD_ACCOUNT,
        variables: { ...payload }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.addAccount,
      message: error ? resp.message : null
    }
  },
  async loadAccountByUsername({ commit }, username) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: ACCOUNT_BY_USERNAME,
        variables: { username }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.accountByEmail,
      message: error ? resp.message : null
    }
  },
  async loadMe({ commit }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.query({
        query: ME,
        variables: {}
      })
    )
    const error = resp instanceof Error
    if (!error) commit('setMe', resp.data.me)
    else commit('setMe', {})
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.me,
      message: error ? resp.message : null
    }
  },
  async updateProfile({ commit }, { id, payload }) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: UPDATE_PROFILE,
        variables: { ...payload, id }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.updateAccount,
      message: error ? resp.message : null
    }
  },
  async verifyAccount({ commit }, code) {
    const graphqlClient = getAuthenticatedClient()
    commit('setLoading', true)
    const resp = await asyncHandler(
      graphqlClient.mutate({
        mutation: VERIFY_ACCOUNT,
        variables: { code }
      })
    )
    const error = resp instanceof Error
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.verifyAccount,
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
  },
  setMe(state, data) {
    state.me = data
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
