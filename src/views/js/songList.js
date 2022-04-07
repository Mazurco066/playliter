// Dependencies
import { mapActions, mapGetters } from 'vuex'
import { chordTransposer } from '../../utils/'

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
          const displayHtmlSong = chordTransposer.plaintextToPreHtml(songBody)
          return `<pre>${displayHtmlSong}</pre>`
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
        const displayHtmlSong = chordTransposer.plaintextToPreHtml(songBody)
        return {
          song: s,
          // The lack of identation is wanted for the pre tag
          html: `<pre>
<b class="title">${ s.title }</b>
<b class="writter">${s.writter}</b>
<b class="tone">Tom: ${s.tone}</b>
<p class="song-body">${displayHtmlSong}</p>
          </pre>`
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