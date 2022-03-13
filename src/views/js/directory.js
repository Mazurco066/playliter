// Dependencies
import { mapActions, mapGetters } from 'vuex'
import { songHelpers } from '../../helpers'

// Component
export default {
  name: 'Directory',
  data: () => ({
    repertory: {}
  }),
  computed: {
    ...mapGetters({
      songLoading: 'song/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      listBandSongs: 'song/listBandSongs'
    }),
    navigateTo (route, band, id = null) {
      this.$router.push({
        name: route,
        params: { band, id }
      })
    },
    navigateToCategories () {
      const { band } = this.$route.params
      this.$router.push({
        name: 'categories',
        params: { band }
      })
    }
  },
  async mounted () {
    const { band } = this.$route.params
    const r = await this.listBandSongs({ band })
    this.repertory = songHelpers.compute(r.data)
    if (r.error) {
      this.$toast.error(`Ocorreu um erro ao obter o repertório da banda!`)
    }
  }
}
