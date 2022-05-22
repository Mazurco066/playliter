// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Shows',
  props: {
    band: {
      default: '',
      type: String
    }
  },
  data: () => ({
    shows: []
  }),
  computed: {
    ...mapGetters({
      showLoading: 'show/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      listBandShows: 'show/listBandShows'
    }),
    saveShow () {
      this.$router.push({
        name: 'saveShow',
        params: { band: this.band }
      })
    },
    viewShow (show = {}) {
      this.$router.push({
        name: 'show',
        params: {
          band: show.band.id,
          id: show.id
        }
      })
    }
  },
  async mounted () {
    const r = await this.listBandShows({ band: this.band })
    if (r.error) {
      this.$toast.error(this.$v('shows.messages[0]'))
    } else {
      this.shows = r.data
    }
  }
}