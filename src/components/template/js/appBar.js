// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'AppBar',
  computed: {
    ...mapGetters({
      me: 'account/getMe'
    }),
    isAccountConfirmed () {
      return this.me.isEmailconfirmed && JSON.parse(this.me.isEmailconfirmed)
    }
  },  
  methods: {
    ...mapActions({
      resetStore: 'RESET'
    }),
    goBack () {
      this.$router.go(-1)
    },
    navigateTo (route, params = {}) {
      this.$router.push({
        name: route,
        params: { ...params }
      })
    },
    logout () {
      this.resetStore()
      this.$router.push({ name: 'signin' })
    }
  }
}