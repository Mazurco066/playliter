// Dependencies
import { mapActions, mapGetters } from 'vuex'
import { chordTransposer } from '../../utils'

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
          this.$toast.error(this.$t('songList.messages[1]'))
          return ''
        }
      }
      return ''
    }
  },
  methods: {
    ...mapActions({
      listBandShow: 'show/listBandShow',
      saveSong: 'song/saveSong',
      loadBandSong: 'song/loadBandSong'
    }),
    async loadShow () {
      const { band, id } = this.$route.params
      const show = await this.listBandShow({ band, id })
      if (!Object.keys(show.data).length > 0) {
        this.$toast.warning(this.$t('songList.messages[0]'))
      } else {
        this.show = show.data
        this.parsePdf()
      }
    },
    async updateTone (transposedSong, transpositions, transpose) {
      // Retrieve updated song data
      const newTone = transpositions.find(t => t.step === transpose).name.root.note._note
      const updatedSongBody = chordTransposer.overwriteBaseTone(transposedSong)

      // Retrieve song from API
      const { band } = this.$route.params
      const songResponse = await this.loadBandSong({ band, id: this.displaySong.id })

      if (songResponse.error) {
        this.$toast.warning(this.$t('song.messages[0]'))
      } else {
        // Update song payload
        const song = songResponse.data
        const payload = {
          id: song.id,
          title: song.title,
          writter: song.writter,
          category: song.category.id,
          isPublic: song.isPublic,
          tone: newTone,
          body: updatedSongBody
        }

        // Update song
        const r = await this.saveSong({ id: song.id, payload })
        if (r.error) {
          this.$toast.error(this.$t('saveSong.messages[2]'))
        } else {
          this.$toast.success(this.$t('saveSong.messages[0]'))
        }

        // Reload show
        await this.loadShow()
      }
    },
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
<p class="song-body">\n${displayHtmlSong}</p>
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
    await this.loadShow()
  }
}