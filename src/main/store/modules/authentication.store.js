// Dependencies
import api, { asyncRequestHandler } from '../../../infra/services/api'

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
    const resp = await asyncRequestHandler(
      api.auth.signIn({ username, password })
    )
    const error = ![200, 201].includes(resp.status)
    if (!error) {
      commit('setAuthorization', resp.data.data.token)
    } else {
      commit('setAuthorization', null)
    }
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async requestPasswordReset({ commit }, email) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.auth.forgotPassword(email)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async resetPassword({ commit }, { accountId, token, newPassword }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.auth.resetPassword(accountId, { token, newPassword })
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
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
