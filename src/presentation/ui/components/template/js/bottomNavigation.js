// Dependencies
import { CurvedBottomNavigation } from 'bottom-navigation-vue'
import { bottomLinks } from '../../../../utils'

// Component
export default {
  name: 'BottomNavigation',
  components: { CurvedBottomNavigation },
  data: () => ({
    selected: 2,
    links: bottomLinks
  }),
  computed: {
    translatedLinks () {
      return this.links.map((link, i) => ({
        ...link,
        label: this.$t(`bottomNav[${i}]`),
        title: this.$t(`bottomNav[${i}]`)
      }))
    }
  },
  mounted () {
    const selectedIndex = this.translatedLinks.find(t => t.path.name === this.$route.name )
    if (selectedIndex) this.selected = selectedIndex.id
  }
}
