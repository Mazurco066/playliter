// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Shows',
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
      const { band } = this.$route.params
      this.$router.push({
        name: 'saveShow',
        params: { band }
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
    const { band } = this.$route.params
    const r = await this.listBandShows({ band })
    if (r.error) {
      this.$toast.error(`Ocorreu um erro ao obter as apresentações da banda! Por favor contate um administrador do sistema.`)
    } else {
      this.shows = r.data
    }
  }
}