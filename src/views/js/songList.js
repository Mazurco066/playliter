// Dependencies
import { mapActions, mapGetters } from 'vuex'
import chordTransposer from '../../utils/chordTransposer'

// Component
export default {
  name: 'SongList',
  data: () => ({
    show: {},
    currentSong: 0
  }),
  computed: {
    ...mapGetters({
      showLoading: 'show/getLoadingStatus'
    }),
    displaySong () {
      const song = this.show.songs && this.show.songs[this.currentSong]
      return song ? this.show.songs[this.currentSong] : {}
    }
  },
  methods: {
    ...mapActions({
      listBandShow: 'show/listBandShow'
    }),
    renderSong () {
      setTimeout(() => chordTransposer('#lyrics').transpose(), 100)
    },
    renderPdf () {
      chordTransposer('.pdf-song').transpose()
    },
    switchSong (order) {
      const songs = [ ...this.show.songs ]
      if (order < 0) {
        this.currentSong = this.currentSong === 0 ? songs.lenght - 1 : this.currentSong - 1
      } else {
        this.currentSong = this.currentSong === (songs.length - 1) ? 0 : this.currentSong + 1
      }      
    },
    downloadReport () {
      this.renderPdf()
      window.print()
    }
  },
  async mounted () {
    const { band, id } = this.$route.params
    const show = await this.listBandShow({ band, id })
    this.show = show.data
    if (!Object.keys(show.data).length > 0) {
      this.$toast.warning(`Apresentação de id ${id} não encontrada!`)
    } else {
      this.renderSong()
    }
  },
  watch: {
    currentSong () {
      const el  = document.getElementsByClassName('transpose-keys')
      while (el[0]) {
        el[0].parentNode.removeChild(el[0])
      }
      this.renderSong()
    }
  }
}