// Dependencies
import api, { asyncRequestHandler } from '../../../infra/services/api'

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
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      id
        ? api.bands.updateBand(id, { ...payload })
        : api.bands.addBand({ ...payload })
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async addBandMember({ commit }, { band, member }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.bands.inviteMember(band, member)
    )
    const error = ![200, 201, 204].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async demoteBandMember({ commit }, { band, member }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.bands.demoteMember(band, member)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async promoteBandMember({ commit }, { band, member }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.bands.promoteMember(band, member)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async removeBandMember({ commit }, { band, member }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.bands.removeMember(band, member)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async loadBand({ commit }, id) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.bands.getBand(id)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async loadBands({ commit }, { limit = 0, offset = 0 }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.bands.listBands(limit, offset)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async removeBand({ commit }, id) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.bands.deleteBand(id)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async listPendingInvites({ commit }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.bands.getPendingInvites()
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async respondInvite({ commit }, { inviteId, response }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.bands.respondInvite({ inviteId, response })
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
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
