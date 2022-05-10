// Dependencies
import { bottomLinks } from '../../../utils'

// Component
export default {
  name: 'BottomNavigation',
  data: () => ({
    links: bottomLinks
  }),
  computed: {
    translatedLinks () {
      return this.links.map((link, i) => ({
        ...link,
        label: this.$t(`bottomNav[${i}]`)
      }))
    }
  },
  methods: {
    navigateTo (route) {
      this.$router.push({ name: route })
    }
  }
}
