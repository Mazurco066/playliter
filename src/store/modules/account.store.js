// Dependencies
import api, { asyncRequestHandler } from '../../api'

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
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.accounts.addAccount({ ...payload })
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async listAccounts({ commit }, { limit = 0, offset = 0 }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.accounts.listAccounts(limit, offset)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async loadAccountByUsername({ commit }, username) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.accounts.getAccountByUsername(username)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async loadMe({ commit }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.accounts.getCurrentAccount()
    )
    const error = ![200, 201].includes(resp.status)
    if (!error) commit('setMe', resp.data.data)
    else commit('setMe', {})
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async updateProfile({ commit }, { id, payload }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.accounts.updateAccount(id, { ...payload })
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async verifyAccount({ commit }, code) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.accounts.verifyAccount(code)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async resendVerification({ commit }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.accounts.resendVerificationEmail()
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
