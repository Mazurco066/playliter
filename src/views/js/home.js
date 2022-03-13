// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Home',
  data: () => ({
    pending: []
  }),
  computed: {
    ...mapGetters({
      showLoading: 'show/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      listPendingShows: 'show/listPendingShows'
    }),
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
    const r = await this.listPendingShows()
    if (r.error) {
      this.$toast.error(`Ocorreu um erro ao obter as apresentações futuras! Por favor contate um administrador do sistema.`)
    } else {
      this.pending = r.data
    }
  }
}
