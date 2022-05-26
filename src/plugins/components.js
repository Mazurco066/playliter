// Dependencies
import BaseButton from '../components/base/Button.vue'
import BaseCheckBox from '../components/base/Checkbox.vue'
import BaseChordDiagram from '../components/base/ChordDiagram.vue'
import BaseDropdown from '../components/base/Dropdown.vue'
import BaseInput from '../components/base/Input.vue'
import BaseLoading from '../components/base/Loading.vue'
import BaseModal from '../components/base/Modal.vue'
import BasePagination from '../components/base/Pagination.vue'
import BaseProgress from '../components/base/Progress.vue'
import BaseRadio from '../components/base/Radio.vue'
import BaseSelect from '../components/base/Select.vue'
import BaseSlider from '../components/base/Slider.vue'
import BaseSongSheet from '../components/base/SongSheet'
import BaseSwitch from '../components/base/Switch.vue'
import BaseTable from '../components/base/Table.vue'
import BaseToggle from '../components/base/Toggle.vue'

// Icons package
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
library.add(fas)
library.add(fab)
library.add(far)

// Components
export default {
  install (Vue) {
    Vue.component(BaseInput.name, BaseInput)
    Vue.component(BaseCheckBox.name, BaseCheckBox)
    Vue.component(BaseChordDiagram.name, BaseChordDiagram)
    Vue.component(BaseDropdown.name, BaseDropdown)
    Vue.component(BaseButton.name, BaseButton)
    Vue.component(BaseLoading.name, BaseLoading)
    Vue.component(BaseModal.name, BaseModal)
    Vue.component(BasePagination.name, BasePagination)
    Vue.component(BaseProgress.name, BaseProgress)
    Vue.component(BaseRadio.name, BaseRadio)
    Vue.component(BaseSelect.name, BaseSelect)
    Vue.component(BaseSlider.name, BaseSlider)
    Vue.component(BaseSongSheet.name, BaseSongSheet)
    Vue.component(BaseSwitch.name, BaseSwitch)
    Vue.component(BaseTable.name, BaseTable)
    Vue.component(BaseToggle.name, BaseToggle)
    Vue.component('font-awesome-icon', FontAwesomeIcon)
  }
}
