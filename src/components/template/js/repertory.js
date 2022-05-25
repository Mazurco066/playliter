// Dependencies
import { mapActions, mapGetters } from 'vuex'
import { songHelpers } from '../../../helpers'

// Component
export default {
  name: 'Repertory',
  data: () => ({
    repertory: {},
    search: ''
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
    }
  },
  async mounted () {
    const r = await this.listBandSongs({ band: this.band })
    this.repertory = songHelpers.compute(r.data)
    if (r.error) {
      this.$toast.error(this.$t('directory.messages[0]'))
    }
  }
}