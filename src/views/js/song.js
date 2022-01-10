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
      loadSong: 'song/loadBandSong',
      removeBandSong: 'song/removeBandSong'
    }),
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
    const r = await this.loadSong({ band, id })
    this.song = r.data
    setTimeout(() => chordTransposer('pre').transpose(), 100)
    if (!Object.keys(r.data).length > 0) {
      this.$toast.warning(`Música de id ${id} não encontrada!`)
    }
  }
}
