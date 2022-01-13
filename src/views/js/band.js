// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Band',
  data: () => ({
    band: {},
    songs: [],
    shows: []
  }),
  computed: {
    ...mapGetters({
      bandLoading: 'band/getLoadingStatus',
      songLoading: 'song/getLoadingStatus',
      showLoading: 'show/getLoadingStatus',
      me: 'account/getMe'
    }),
    isDisplayReady () {
      return !this.bandLoading && Object.keys(this.band).length > 0
    }
  },
  methods: {
    ...mapActions({
      loadBand: 'band/loadBand',
      listBandSongs: 'song/listBandSongs',
      listBandShows: 'show/listBandShows'
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
    const [ band, songs, shows ] = await Promise.all([
      this.loadBand(id),
      this.listBandSongs({ band: id, limit: 3 }),
      this.listBandShows({ band: id, limit: 3 })
    ])
    this.band = band.data
    this.songs = songs.data
    this.shows = shows.data
    if (!Object.keys(band.data).length > 0) {
      this.$toast.warning(`Banda de id ${id} não encontrada!`)
    }
  }
}
