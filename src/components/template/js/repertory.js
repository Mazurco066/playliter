// Dependencies
import { mapActions, mapGetters } from 'vuex'
import { songHelpers } from '../../../helpers'

// Component
export default {
  name: 'Repertory',
  data: () => ({
    repertory: {},
    search: '',
    limit: 15,
    offset: 0,
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
        const filteredRepertory = this.repertory.songs.map(category => {
          const filteredItems = category.items.filter(s => 
            s.title.toLowerCase().includes(this.search.toLowerCase()) || 
            s.writter.toLowerCase().includes(this.search.toLowerCase())
          )
          return filteredItems.length
            ? { ...category, items: filteredItems }
            : false
        })
        return filteredRepertory.filter(o => Boolean(o))
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
    loadMore () {
      this.scrollElement = document.getElementById('main-body')
      this.scrollElement.onscroll = async () => {
        let response, bottomOfWindow = this.scrollElement.scrollHeight - this.scrollElement.clientHeight === this.scrollElement.scrollTop
        if (bottomOfWindow && !this.songLoading && !this.blockInfiniteScroll) {
          const scrollPosition = this.scrollElement.scrollTop
          console.log('here on bottom', scrollPosition)
          response = await this.listBandSongs({ band: this.band, limit: this.limit, offset: this.offset })
          if (!response.error) {
            // this.songs = [ ...this.songs, ...response.data ]
            this.repertory = songHelpers.append(this.repertory, response.data)
            this.offset += this.limit
            // Keep scroll height
            this.scrollElement.scrollTop = scrollPosition
            if (response.data.length === 0) this.blockInfiniteScroll = true
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
      offset: this.offset
    })
    if (r.error) {
      this.$toast.error(this.$t('directory.messages[0]'))
    } else {
      this.repertory = songHelpers.compute(r.data)
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