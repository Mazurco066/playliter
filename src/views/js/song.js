// Dependencies
import { mapActions, mapGetters } from 'vuex'
import chordTransposer from '../../utils/chordTransposer'

// Component
export default {
  name: 'Song',
  data: () => ({
    song: {}
  }),
  computed: {
    ...mapGetters({
      songLoading: 'song/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      loadSong: 'song/loadBandSong'
    })
  },
  async mounted () {
    const { id, band } = this.$route.params
    const r = await this.loadSong({ band, id })
    this.song = r.data
    setTimeout(() => chordTransposer('pre').transpose(), 100)
    if (!Object.keys(r.data).length > 0) {
      this.$toast.warning(`Música de id ${id} não encontrada!`)
    }
  }
}
