// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Band',
  data: () => ({
    band: {},
    songs: []
  }),
  computed: {
    ...mapGetters({
      bandLoading: 'band/getLoadingStatus',
      me: 'account/getMe'
    }),
    isDisplayReady () {
      return !this.bandLoading && Object.keys(this.band).length > 0
    }
  },
  methods: {
    ...mapActions({
      loadBand: 'band/loadBand',
      listBandSongs: 'song/listBandSongs'
    }),
    navigateTo (route, band, id = null) {
      this.$router.push({
        name: route,
        params: { band, id }
      })
    }
  },
  async mounted () {
    const { id } = this.$route.params
    const [ band, songs ] = await Promise.all([
      this.loadBand(id),
      this.listBandSongs({ band: id, limit: 3 })
    ])
    this.band = band.data
    this.songs = songs.data
    if (!Object.keys(band.data).length > 0) {
      this.$toast.warning(`Banda de id ${id} não encontrada!`)
    }
  }
}
