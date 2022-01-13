// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Show',
  data: () => ({
    show: {}
  }),
  computed: {
    ...mapGetters({
      showLoading: 'show/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      listBandShow: 'show/listBandShow',
      unlinkSong: 'show/unlinkSong'
    }),
    navigateTo (route, band, id = null) {
      this.$router.push({
        name: route,
        params: { band, id }
      })
    },
    async reloadData () {
      const { band, id } = this.$route.params
      const show = await this.listBandShow({ band, id })
      this.show = show.data
      if (!Object.keys(show.data).length > 0) {
        this.$toast.warning(`Apresentação de id ${id} não encontrada!`)
      }
    },
    async removeSongFromShow (song) {
      const songId = song.id
      const showId = this.show.id
      this.$swal({
        title: 'Confirmação!',
        html: `Deseja remover essa música da apresentação <strong>${this.show.title}</strong>?`,
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Remover',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.unlinkSong({ song: songId, show: showId })
          if (response.error) {
            this.$toast.error(
              response.message.replace('GraphQL error:', '') ||
              `Ocorreu um erro ao remover a música da apresentação! Por favor contate um administrador do sistema.`
            )
          } else {
            this.$toast.success(`Música removida da apresentação ${show.title}`)
            // Reload show
            await this.reloadData()
          }
        }
      })
    },
  },
  async mounted () {
    const { band, id } = this.$route.params
    const show = await this.listBandShow({ band, id })
    this.show = show.data
    if (!Object.keys(show.data).length > 0) {
      this.$toast.warning(`Apresentação de id ${id} não encontrada!`)
    }
  }
}
