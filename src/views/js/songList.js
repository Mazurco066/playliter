// Dependencies
import { mapActions, mapGetters } from 'vuex'
import { ChordSheetParser, HtmlDivFormatter } from 'chordsheetjs'

// Component
export default {
  name: 'SongList',
  data: () => ({
    show: {},
    currentSong: 0,
    parsedSongs: []
  }),
  computed: {
    ...mapGetters({
      showLoading: 'show/getLoadingStatus'
    }),
    displaySong () {
      const song = this.show.songs && this.show.songs[this.currentSong]
      return song ? this.show.songs[this.currentSong] : {}
    },
    displaySongHtml () {
      const song = this.show.songs && this.show.songs[this.currentSong]
      if (song) {
        try {
          const songBody = song.body
          const parser = new ChordSheetParser()
          const parsedSong = parser.parse(songBody)
          const formatter = new HtmlDivFormatter()
          const displayHtmlSong = formatter.format(parsedSong)
          return displayHtmlSong
        } catch (e) {
          console.log('[parser error]', e)
          this.$toast.error('Ocorreu um erro ao parsear a música!')
          return ''
        }
      }
      return ''
    }
  },
  methods: {
    ...mapActions({
      listBandShow: 'show/listBandShow'
    }),
    parsePdf () {
      const songs = [ ...this.show.songs ]
      this.parsedSongs = songs.map(s => {
        const songBody = s.body
        const parser = new ChordSheetParser()
        const formatter = new HtmlDivFormatter()
        try {
          const parsedSong = parser.parse(songBody)
          const displayHtmlSong = formatter.format(parsedSong)
          return { song: s, html: displayHtmlSong } 
        } catch (e) {
          console.log('[parser error]', e)
          this.$toast.error('Ocorreu um erro ao parsear a música!')
          return { song: s, html: '<div></div>' }
        }
      })
    },
    switchSong (order) {
      const songs = [ ...this.show.songs ]
      if (order < 0) {
        this.currentSong = this.currentSong === 0 ? songs.length - 1 : this.currentSong - 1
      } else {
        this.currentSong = this.currentSong === (songs.length - 1) ? 0 : this.currentSong + 1
      }      
    },
    downloadReport () {
      window.print()
    }
  },
  async mounted () {
    const { band, id } = this.$route.params
    const show = await this.listBandShow({ band, id })
    if (!Object.keys(show.data).length > 0) {
      this.$toast.warning(`Apresentação de id ${id} não encontrada!`)
    } else {
      this.show = show.data
      this.parsePdf()
    }
  }
}