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
      unlinkSong: 'show/unlinkSong',
      deleteShow: 'show/removeShow'
    }),
    viewAsPlaylist () {
      const { band, id } = this.$route.params
      this.$router.push({
        name: 'playlist',
        params: { band, id }
      })
    },
    navigateTo (route, band, id = null) {
      this.$router.push({
        name: route,
        params: { band, id }
      })
    },
    editShow () {
      const { band, id } = this.$route.params
      this.$router.push({
        name: 'editShow',
        params: { band, id }
      })
    },
    async removeShow () {
      this.$swal({
        title: 'Essa ação é permanente!',
        text: 'Deseja excluir essa apresentação?',
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Excluir',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.deleteShow(this.show.id)
          if (response.error) {
            this.$toast.error(`Ocorreu um erro ao excluir a apresentação! Por favor contate um administrador do sistema.`)
          } else {
            this.$toast.success('Apresentação removida com sucesso!')
            const { band } = this.$route.params
            this.$router.push({ name: 'band', params: { id: band } })
          }
        }
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
