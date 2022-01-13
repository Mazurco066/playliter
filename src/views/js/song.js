// Dependencies
import { mapActions, mapGetters } from 'vuex'
import chordTransposer from '../../utils/chordTransposer'

// Component
export default {
  name: 'Song',
  data: () => ({
    song: {},
    shows: [],
    isListModalOpen: false
  }),
  computed: {
    ...mapGetters({
      songLoading: 'song/getLoadingStatus',
      showLoading: 'show/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      loadSong: 'song/loadBandSong',
      removeBandSong: 'song/removeBandSong',
      listBandShows: 'show/listBandShows',
      linkSong: 'show/linkSong'
    }),
    closeListModal () {
      this.isListModalOpen = false
    },
    openListModal () {
      this.isListModalOpen = true
    },
    async addSongToShow (show) {
      const songId = this.song.id
      const showId = show.id
      this.$swal({
        title: 'Confirmação!',
        html: `Deseja adicionar essa música a apresentação <strong>${show.title}</strong>?`,
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Adicionar',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.linkSong({ song: songId, show: showId })
          if (response.error) {
            this.$toast.error(
              response.message.replace('GraphQL error:', '') ||
              `Ocorreu um erro ao adicionar a música na apresentação! Por favor contate um administrador do sistema.`
            )
          } else {
            this.$toast.success(`Música adicionada a apresentação ${show.title}`)
            this.closeListModal()
          }
        }
      })
    },
    async deleteSong () {
      const id = this.song.id
      this.$swal({
        title: 'Essa ação é permanente!',
        text: 'Deseja remover essa música?',
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: 'Remover',
        denyButtonText: `Cancelar`
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.removeBandSong(id)
          if (response.error) {
            this.$toast.error(`Ocorreu um erro ao remover a música! Por favor contate um administrador do sistema.`)
          } else {
            this.$toast.success('Música removida com sucesso!')
            this.$router.push({ name: 'band', params: { id: this.song.band.id } })
          }
        }
      })
    }
  },
  async mounted () {
    const { id, band } = this.$route.params
    // First load song
    const r = await this.loadSong({ band, id })
    this.song = r.data
    setTimeout(() => chordTransposer('pre').transpose(), 100)
    if (!Object.keys(r.data).length > 0) {
      this.$toast.warning(`Música de id ${id} não encontrada!`)
    }
    // Then the shows
    const shows = await this.listBandShows({ band })
    this.shows = shows.data
  }
}
