// Dependencies
import components from './components'
import directives from './directives'

// Libraries
import Toaster from '@meforma/vue-toaster'

// Utils
import { elementUtils, validations, tableUtils, textUtils } from '../utils'

// Libraries styles
import 'sweetalert2/dist/sweetalert2.min.css'
import 'vue3-carousel/dist/carousel.css'

// Plugins
export default {
  install (Vue) {
    // Plugins
    Vue.use(components)
    Vue.use(directives)
    Vue.use(Toaster, {
      position: 'bottom',
      duration: 3000
    })
    // Classes
    Vue.config.globalProperties.$element = elementUtils
    Vue.config.globalProperties.$table = tableUtils
    Vue.config.globalProperties.$text = textUtils
    Vue.config.globalProperties.$translations = validations
  }
}
