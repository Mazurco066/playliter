// Dependencies
import { mapActions, mapGetters } from 'vuex'
import { songHelpers } from '../../helpers'

// Component
export default {
  name: 'Directory',
  data: () => ({
    repertory: {},
    search: ''
  }),
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
            ? {
              ...category,
              items: filteredItems
            }
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
      const { band } = this.$route.params
      this.$router.push({
        name: 'categories',
        params: { band }
      })
    },
    saveSong () {
      const { band } = this.$route.params
      this.$router.push({
        name: 'saveSong',
        params: { band }
      })
    }
  },
  async mounted () {
    const { band } = this.$route.params
    const r = await this.listBandSongs({ band })
    this.repertory = songHelpers.compute(r.data)
    if (r.error) {
      this.$toast.error(`Ocorreu um erro ao obter o repertório da banda!`)
    }
  }
}
