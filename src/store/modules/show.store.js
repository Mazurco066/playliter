// Dependencies
import api, { asyncRequestHandler } from '../../api'

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
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      id
        ? api.shows.updateShow(id, { ...payload })
        : api.shows.addShow({ ...payload, band })
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async reorderSongs({ commit }, {  id = null, songs = [] }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.shows.reorderShow(id, { songs: songs.map(({ id }) => id) })
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async removeShow({ commit }, id) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.shows.deleteShow(id)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async linkSong({ commit }, { show, song }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.shows.linkSong(show, song)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async unlinkSong({ commit }, { show, song }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.shows.unlinkSong(show, song)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async listBandShow({ commit }, { band, id }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.shows.getShow(band, id)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async listBandShows({ commit }, { limit = 0, offset = 0, band }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.shows.listShows(band, limit, offset)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async listPendingShows({ commit }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.shows.listFutureShows()
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async listAccountShows({ commit }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.shows.listAccountShows()
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async saveObservation({ commit }, { payload, showId }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      payload.id
        ? api.shows.updateShowObservation(showId, payload.id, {
            title: payload.title,
            data: payload.data
          })
        : api.shows.addShowObservation(showId, {
            title: payload.title,
            data: payload.data
          })
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async removeObservation({ commit }, { showId, observationId }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.shows.removeShowObservation(showId, observationId)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async importDailyLiturgy({ commit }, date) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.helpers.dailyLiturgy(date)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
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
