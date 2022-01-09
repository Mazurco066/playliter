// Dependencies
import { getAuthenticatedClient } from '../../api'
import { asyncHandler } from '../../utils'

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
