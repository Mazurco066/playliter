// Object initial state
const initialState = () => ({
  theme: 'light'
})

// State object
const state = initialState()

// Getter object
const getters = {
  getTheme(state) {
    return state.theme
  }
}

// Actions
const actions = {
  async switchTheme({ commit }, theme) {
    commit('setTheme', theme)
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
  setTheme(state, data) {
    state.theme = data
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
