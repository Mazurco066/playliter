// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'PublicSongs',
  data: () => ({
    songs: [],
    limit: 40,
    offset: 0,
    filter: '',
    blockInfiniteScroll: false,
    scrollElement: null
  }),
  computed: {
    ...mapGetters({
      songLoading: 'song/getLoadingStatus'
    })
  },
  methods: {
    ...mapActions({
      listPublicSongs: 'song/listPublicSongs'
    }),
    async filterSongs (clear = false) {
      if (clear) this.filter = ''
      this.offset = 0
      await this.getInitialSongs()
    },
    async getInitialSongs () {
      const r = await this.listPublicSongs({ limit: this.limit, offset: this.offset, filter: this.filter })
      if (!r.error) {
        this.songs = r.data.data
        this.offset += this.limit
      } else {
        this.$toast.warning(this.$t('publicSongs.messages[0]'))
      }
    },
    loadMore () {
      this.scrollElement = document.getElementById('main-body')
      this.scrollElement.onscroll = async () => {
        const endOfPage = this.scrollElement.scrollHeight - this.scrollElement.clientHeight
        const currentPosition = Math.round(this.scrollElement.scrollTop)
        const difference = endOfPage - currentPosition
        let response
        if (difference < 2 && !this.songLoading && !this.blockInfiniteScroll) {
          response = await this.listPublicSongs({ limit: this.limit, offset: this.offset, filter: this.filter })
          if (!response.error) {
            this.songs = [ ...this.songs, ...response.data.data ]
            this.offset += this.limit
            if (response.data.length === 0) this.blockInfiniteScroll = true
          } else {
            this.$toast.warning(this.$t('publicSongs.messages[0]'))
          }
        }
      }
    },
    navigateTo (route, band, id = null) {
      this.$router.push({
        name: route,
        params: { band, id }
      })
    }
  },
  async beforeMount () {
    await this.getInitialSongs()
  },
  mounted () {
    this.loadMore()
  },
  beforeUnmount () {
    // Remove DOM binded events
    this.scrollElement.onscroll = () => {}
  }
}
