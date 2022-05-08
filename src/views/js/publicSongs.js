// Dependencies
import { mapActions, mapGetters } from 'vuex'

// Component
export default {
  name: 'PublicSongs',
  data: () => ({
    songs: [],
    limit: 15,
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
    async getInitialSongs () {
      const r = await this.listPublicSongs({ limit: this.limit, offset: this.offset, filter: this.filter })
      if (!r.error) {
        this.songs = r.data
        this.offset += this.limit
      } else {
        this.$toast.warning('Ocorreu um erro ao obter o repertório público. Por favor tente novamente mais tarde!')
      }
    },
    loadMore () {
      this.scrollElement = document.getElementById('main-body')
      this.scrollElement.onscroll = async () => {
        let response, bottomOfWindow = this.scrollElement.scrollHeight - this.scrollElement.clientHeight === this.scrollElement.scrollTop
        if (bottomOfWindow && !this.blockInfiniteScroll) {
          response = await this.listPublicSongs({ limit: this.limit, offset: this.offset, filter: this.filter })
          if (!response.error) {
            this.songs = [ ...this.songs, ...response.data ]
            this.offset += this.limit
            if (response.data.length === 0) this.blockInfiniteScroll = true
          } else {
            this.$toast.warning('Ocorreu um erro ao obter o repertório público. Por favor tente novamente mais tarde!')
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
