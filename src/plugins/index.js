// Dependencies
import components from './components'
import directives from './directives'

// Libraries
import Toaster from '@meforma/vue-toaster'
import VueSweetAlert from 'vue-sweetalert2'

// Language tools
import VueI18n from '../i18n'

// Utils
import { elementUtils, validations, tableUtils, textUtils } from '../utils'

// Libraries styles
import 'sweetalert2/dist/sweetalert2.min.css'

// Plugins
export default {
  install (Vue) {
    // Plugins
    Vue.use(components)
    Vue.use(directives)
    Vue.use(VueSweetAlert)
    Vue.use(VueI18n)
    Vue.use(Toaster, { position: 'bottom', duration: 3000 })
    // Classes
    Vue.config.globalProperties.$element = elementUtils
    Vue.config.globalProperties.$table = tableUtils
    Vue.config.globalProperties.$text = textUtils
    Vue.config.globalProperties.$translations = validations
  }
}
