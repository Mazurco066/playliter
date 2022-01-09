// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Directory',
  data: () => ({
    songs: []
  }),
  computed: {
    ...mapGetters({
      songLoading: 'song/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      listBandSongs: 'song/listBandSongs'
    })
  },
  async mounted () {
    const { band } = this.$route.params
    const r = await this.listBandSongs({ band })
    this.songs = r.data
    if (r.error) {
      this.$toast.error(`Ocorreu um erro ao obter o repertório da banda!`)
    }
  }
}