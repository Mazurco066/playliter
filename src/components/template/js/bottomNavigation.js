// Dependencies
import { bottomLinks } from '../../../utils'

// Component
export default {
  name: 'BottomNavigation',
  data: () => ({
    links: bottomLinks
  }),
  methods: {
    navigateTo (route) {
      this.$router.push({ name: route })
    }
  }
}
