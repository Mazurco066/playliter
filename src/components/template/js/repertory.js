// Dependencies
import { mapActions, mapGetters } from 'vuex'
import { songHelpers } from '../../../helpers'

// Component
export default {
  name: 'Repertory',
  data: () => ({
    repertory: {},
    search: '',
    limit: 40,
    offset: 0,
    total: 0,
    blockInfiniteScroll: false,
    scrollElement: null
  }),
  props: {
    band: {
      default: '',
      type: String
    }
  },
  computed: {
    ...mapGetters({
      songLoading: 'song/getLoadingStatus'
    }),
    filteredRepertorySongs () {
      if (this.repertory.songs) {
        return this.repertory.songs
      }
      return []
    }
  },
  methods: {
    ...mapActions({
      listBandSongs: 'song/listBandSongs'
    }),
    navigateTo (route, band, id = null) {
      this.$router.push({
        name: route,
        params: { band, id }
      })
    },
    navigateToCategories () {
      this.$router.push({
        name: 'categories',
        params: { band: this.band }
      })
    },
    saveSong () {
      this.$router.push({
        name: 'saveSong',
        params: { band: this.band }
      })
    },
    publicSongs () {
      this.$router.push({
        name: 'publicSongs'
      })
    },
    async filterSongs (clear = false) {
      if (clear) this.search = ''
      this.offset = 0
      this.total = 0
      const r = await this.listBandSongs({
        band: this.band,
        limit: this.limit,
        offset: this.offset,
        filter: this.search
      })
      if (r.error) {
        this.$toast.error(this.$t('directory.messages[0]'))
      } else {
        this.repertory = songHelpers.compute(r.data.data)
        this.total = r.data.total
        this.offset += this.limit
      }
    },
    loadMore () {
      this.scrollElement = document.getElementById('main-body')
      this.scrollElement.onscroll = async () => {
        let response, bottomOfWindow = this.scrollElement.scrollHeight - this.scrollElement.clientHeight === Math.round(this.scrollElement.scrollTop)
        if (bottomOfWindow && !this.songLoading && this.total !== this.repertory.numberOfItems && !this.blockInfiniteScroll) {
          const scrollPosition = this.scrollElement.scrollTop
          response = await this.listBandSongs({
            band: this.band,
            limit: this.limit,
            offset: this.offset,
            filter: this.search
          })
          if (!response.error) {
            this.repertory = songHelpers.append(this.repertory, response.data.data)
            this.total = response.data.total
            this.offset += this.limit
            // Keep scroll height
            this.scrollElement.scrollTop = scrollPosition
            if (response.data.data.length === 0) this.blockInfiniteScroll = true
          } else {
            this.$toast.error(this.$t('directory.messages[0]'))
          }
        }
      }
    }
  },
  async beforeMount () {
    const r = await this.listBandSongs({
      band: this.band,
      limit: this.limit,
      offset: this.offset,
      filter: this.search
    })
    if (r.error) {
      this.$toast.error(this.$t('directory.messages[0]'))
    } else {
      this.repertory = songHelpers.compute(r.data.data)
      this.total = r.data.total
      this.offset += this.limit
    }
  },
  async mounted () {
    await this.loadMore()
  },
  beforeUnmount () {
    // Remove DOM binded events
    this.scrollElement.onscroll = () => {}
  }
}