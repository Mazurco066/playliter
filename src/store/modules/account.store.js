// Dependencies

// Object initial state
const initialState = () => ({
  me: {},
  loading: false
})

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
