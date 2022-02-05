// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Bands',
  data: () => ({
    bands: []
  }),
  computed: {
    ...mapGetters({
      me: 'account/getMe',
      bandLoading: 'band/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      loadBands: 'band/loadBands'
    }),
    randomIcon () {
      const rng = Math.floor(Math.random() * 4 + 1)
      return `0${rng}.png`
    },
    navigateTo (route, id = null) {
      this.$router.push({
        name: route,
        params: { id }
      })
    }
  },
  async mounted () {
    const r = await this.loadBands({})
    this.bands = r.data
  }
}
