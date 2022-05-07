// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Song',
  data: () => ({
    song: {},
    band: {},
    shows: [],
    isListModalOpen: false
  }),
  computed: {
    ...mapGetters({
      me: 'account/getMe',
      bandLoading: 'band/getLoadingStatus',
      songLoading: 'song/getLoadingStatus',
      showLoading: 'show/getLoadingStatus'
    }),
    isLoading () {
      return this.bandLoading || this.songLoading
    },
    isEditable () {
      if (this.isLoading) {
        return false
      } else if (Object.keys(this.band).length > 0) {
        const { id } = this.me
        const isBandAdmin = this.band.admins.find(m => m.id === id) !== undefined
        const isBandMember = this.band.members.find(m => m.id === id) !== undefined
        const isBandOwner = this.band.owner.id === id
        return (isBandAdmin || isBandMember || isBandOwner)
      } else {
        return false
      } 
    },
    isRemovable () {
      if (this.isLoading) {
        return false
      } else if (Object.keys(this.band).length > 0) {
        const { id } = this.me
        const isBandAdmin = this.band.admins.find(m => m.id === id) !== undefined
        const isBandOwner = this.band.owner.id === id
        return (isBandAdmin || isBandOwner)
      } else {
        return false
      } 
    }
  },
  methods: {
    ...mapActions({
      loadSong: 'song/loadBandSong',
      removeBandSong: 'song/removeBandSong',
      listBandShows: 'show/listBandShows',
      linkSong: 'show/linkSong',
      loadBand: 'band/loadBand'
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
    },
    editSong () {
      const { id, band } = this.$route.params
      this.$router.push({
        name: 'editSong',
        params: { id, band }
      })
    }
  },
  async mounted () {
    const { id, band } = this.$route.params
    // First load song
    const r = await this.loadSong({ band, id })
    this.song = r.data
    if (!Object.keys(r.data).length > 0) {
      this.$toast.warning(`Música de id ${id} não encontrada!`)
    }
    
    // Then list shows and band
    const [ shows, currentBand ] = await Promise.all([
      this.listBandShows({ band }),
      this.loadBand(band)
    ])
    this.shows = shows.data
    this.band = currentBand.data
  }
}
