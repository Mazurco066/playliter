// Dependencies
import { mapActions, mapGetters } from 'vuex'
import { chordTransposer } from '../../utils'

// Component
export default {
  name: 'Song',
  data: () => ({
    song: {},
    band: {},
    bands: [],
    shows: [],
    isListModalOpen: false,
    isCloneModalOpen: false,
    showFilter: ''
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
    },
    filteredShowItems () {
      return this.shows.filter(show =>
        show.title.toLowerCase().includes(this.showFilter.toLowerCase())
      )
    }
  },
  methods: {
    ...mapActions({
      loadSong: 'song/loadBandSong',
      removeBandSong: 'song/removeBandSong',
      listAccountShows: 'show/listAccountShows',
      listBandCategories: 'song/listBandCategories',
      linkSong: 'show/linkSong',
      loadBand: 'band/loadBand',
      loadBands: 'band/loadBands',
      saveSong: 'song/saveSong'
    }),
    async updateTone (transposedSong, transpositions, transpose) {
      // Retrieve updated song data
      const newTone = transpositions.find(t => t.step === transpose).name.root.note._note
      const updatedSongBody = chordTransposer.overwriteBaseTone(transposedSong)

      // Update song payload
      const payload = {
        id: this.song.id,
        title: this.song.title,
        writter: this.song.writter,
        category: this.song.category.id,
        isPublic: this.song.isPublic,
        tone: newTone,
        body: updatedSongBody
      }

      // Update song
      const r = await this.saveSong({ id: this.song.id, payload })
      if (r.error) {
        this.$toast.error(this.$t('saveSong.messages[2]'))
      } else {
        this.$toast.success(this.$t('saveSong.messages[0]'))
      }

      // Reload song
      const { id, band } = this.$route.params
      const r2 = await this.loadSong({ band, id })
      this.song = r2.data
    },
    closeListModal () {
      this.showFilter = ''
      this.isListModalOpen = false
    },
    openListModal () {
      this.showFilter = ''
      this.isListModalOpen = true
    },
    closeCloneModal () {
      this.isCloneModalOpen = false
      this.bands = []
    },
    async cloneSong (band) {
      this.$swal({
        title: this.$t('song.cloneSwal.title'),
        html: this.$t('song.cloneSwal.description'),
        icon: 'info',
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: this.$t('song.cloneSwal.confirm'),
        denyButtonText: this.$t('song.cloneSwal.deny'),
      }).then(async (result) => {
        if (result.isConfirmed) {
          const swal = this.$swal({
            icon: 'info',
            title: this.$t('song.cloneSwal.loadingTitle'),
            text: this.$t('song.cloneSwal.loadingDescription'),
            showConfirmButton: false,
            allowOutsideClick: false
          })
          const { id: bandId } = band
          const categories = await this.listBandCategories({ band: bandId })
          if (categories.error) {
            this.$toast.error(this.$t('song.cloneSwal.errorMessage'))
          }
          const categoriesList = categories.data
          if (categoriesList.length <= 0) {
            this.$toast.warning(this.$t('song.cloneSwal.categoryError'))
          }
          const firstCategoryId = categoriesList[0].id
          const r = await this.saveSong({ payload: {
            title: `${this.song.title} - Copy`,
            writter: this.song.writter,
            category: firstCategoryId,
            isPublic: false,
            tone: this.song.tone,
            body: this.song.body,
            band: bandId
          }})
          swal.close()
          if (r.error) {
            this.$toast.error(this.$t('song.cloneSwal.errorMessage'))
          } else {
            this.$toast.success(this.$t('song.cloneSwal.successMessage'))
            this.$router.push({
              name: 'band',
              params: { id: bandId }
            })
          }
        }
      })
    },
    async openCloneModal () {  
      this.isCloneModalOpen = true
      const r = await this.loadBands({})
      this.bands = r.data
    },
    async addSongToShow (show) {
      const songId = this.song.id
      const showId = show.id
      this.$swal({
        title: this.$t('song.messages[5]'),
        html: this.$t('song.messages[6]') + ` <strong>${show.title}</strong>?`,// `Deseja adicionar essa música a apresentação <strong>${show.title}</strong>?`,
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: this.$t('song.addAction'),
        denyButtonText: this.$t('song.cancelAction')
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.linkSong({ song: songId, show: showId })
          if (response.error) {
            this.$toast.error(
              response.message ||
              this.$t('song.messages[7]')
            )
          } else {
            this.$toast.success(this.$t('song.messages[8]') + ` ${show.title}`)
            this.closeListModal()
          }
        }
      })
    },
    async deleteSong () {
      const id = this.song.id
      this.$swal({
        title: this.$t('song.messages[1]'),
        text: this.$t('song.messages[2]'),
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: this.$t('song.removeAction'),
        denyButtonText: this.$t('song.cancelAction')
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.removeBandSong(id)
          if (response.error) {
            this.$toast.error(this.$t('song.messages[3]'))
          } else {
            this.$toast.success(this.$t('song.messages[4]'))
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

    // Alert if song was not found
    if (!Object.keys(r.data).length > 0) {
      this.$toast.warning(this.$t('song.messages[0]'))
    }
    
    // Then list shows and band
    const [ shows, currentBand ] = await Promise.all([
      this.listAccountShows(),
      this.loadBand(band)
    ])
    this.shows = shows.data
    this.band = currentBand.data
  }
}
