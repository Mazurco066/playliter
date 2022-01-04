// Dependencies
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Store modules
import modules from './modules'

// Join stores
export default createStore({
  modules,
  actions: {
    RESET({ commit }) {
      Object.keys(modules).forEach(moduleName => {
        commit(`${moduleName}/reset`)
      })
    }
  },
  plugins: [
    createPersistedState({
      reducer: persistedState => {
        // delete persistedState.account
        // delete persistedState.transaction
        // delete persistedState.establishment
        // delete persistedState.category
        return { ...persistedState }
      }
    })
  ]
})
