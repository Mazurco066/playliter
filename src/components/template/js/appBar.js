// Dependencies
import { mapGetters } from 'vuex'

// Component
export default {
  name: 'AppBar',
  computed: {
    ...mapGetters({
      me: 'account/getMe'
    })
  },  
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}