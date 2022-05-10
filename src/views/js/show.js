// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'Show',
  data: () => ({
    show: {},
    backupShow: {},
    reorderMode: false
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
      deleteShow: 'show/removeShow',
      reorderSongs: 'show/reorderSongs'
    }),
    toggleReorder () {
      if (!this.reorderMode) {
        this.backupShow = JSON.parse(JSON.stringify(this.show))
      } else {
        this.show = JSON.parse(JSON.stringify(this.backupShow))
        this.backupShow = {}
      } 
      this.reorderMode = !this.reorderMode
    },
    switchSong (current, target) {
      const songs = this.show.songs
      const currentSong = songs[current]
      const targetSong = songs[target]
      songs[target] = currentSong
      songs[current] = targetSong
      this.show = { ...this.show, songs }
    },
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
    async reorder () {
      const { id, songs } = this.show
      this.$swal({
        title: this.$t('show.messages[0]'),
        text: this.$t('show.messages[1]'),
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: this.$t('show.reorderAction'),
        denyButtonText: this.$t('show.cancelAction')
      }).then(async (result) => {
        if (result.isConfirmed) {
          const r = await this.reorderSongs({ id, songs })
          if (r.error) {
            this.$toast.error(this.$t('show.messages[2]'))
          } else {
            this.$toast.success(this.$t('show.messages[3]'))
            await this.loadShow()
          }
        }
      })
    },
    async removeShow () {
      this.$swal({
        title: this.$t('show.messages[4]'),
        text: this.$t('show.messages[5]'),
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: this.$t('show.deleteAction'),
        denyButtonText: this.$t('show.cancelAction')
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.deleteShow(this.show.id)
          if (response.error) {
            this.$toast.error(this.$t('show.messages[6]'))
          } else {
            this.$toast.success(this.$t('show.messages[7]'))
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
        this.$toast.warning(this.$t('show.messages[8]'))
      }
    },
    async removeSongFromShow (song) {
      const songId = song.id
      const showId = this.show.id
      this.$swal({
        title: this.$t('show.messages[9]'),
        html: this.$t('show.messages[10]') + ` <strong>${this.show.title}</strong>?`,
        showDenyButton: true,
        confirmButtonColor: '#1C8781',
        confirmButtonText: this.$t('show.removeAction'),
        denyButtonText: this.$t('show.cancelAction')
      }).then(async (result) => {
        if (result.isConfirmed) {
          const response = await this.unlinkSong({ song: songId, show: showId })
          if (response.error) {
            this.$toast.error(
              response.message.replace('GraphQL error:', '') ||
              this.$t('show.messages[11]')
            )
          } else {
            this.$toast.success(this.$t('show.messages[12]') + ` ${show.title}`)
            // Reload show
            await this.reloadData()
          }
        }
      })
    },
    async loadShow() {
      const { band, id } = this.$route.params
      const show = await this.listBandShow({ band, id })
      this.show = show.data
      this.backupShow = {}
      this.reorderMode = false
      if (!Object.keys(show.data).length > 0) {
        this.$toast.warning(this.$t('show.messages[8]'))
      }
    }
  },
  async mounted () {
    await this.loadShow()
  }
}
