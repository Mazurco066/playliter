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
  async saveCategory({ commit }, { id = null, payload }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      id
        ? api.categories.updateCategory(id, {
          title: payload.title,
          description: payload.description
        })
        : api.categories.addCategory(payload.band, {
          title: payload.title,
          description: payload.description
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
  async saveSong({ commit }, { id = null, payload }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      id
        ? api.songs.updateSong(id, {
            title: payload.title,
            writter: payload.writter,
            tone: payload.tone,
            category: payload.category,
            isPublic: payload.isPublic,
            body: payload.body
          })
        : api.songs.addSong(payload.band, {
            title: payload.title,
            writter: payload.writter,
            tone: payload.tone,
            category: payload.category,
            isPublic: payload.isPublic,
            body: payload.body
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
  async loadBandSong({ commit }, { band, id }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.songs.getSong(band, id)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async listBandSongs({ commit }, { limit = 0, offset = 0, band, filter = '' }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.songs.listBandSongs(band, filter, limit, offset)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async listPublicSongs({ commit }, { limit = 0, offset = 0, filter = '' }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.songs.listPublicSongs(filter, limit, offset)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async removeBandSong({ commit }, id) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.songs.deleteSong(id)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async removeCategory({ commit }, id) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.categories.deleteCategory(id)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? {} : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async listBandCategories({ commit }, { band, limit = 0, offset = 0 }) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.categories.listCategories(band, limit, offset)
    )
    const error = ![200, 201].includes(resp.status)
    commit('setLoading', false)
    return {
      error: error,
      data: error ? [] : resp.data.data,
      message: error ? resp.data.status.message : null
    }
  },
  async scrapSong({ commit }, url) {
    commit('setLoading', true)
    const resp = await asyncRequestHandler(
      api.helpers.scrapSong(url)
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
