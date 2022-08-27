// Dependencies
import BaseArea from '../../presentation/ui/components/base/Area.vue'
import BaseButton from '../../presentation/ui/components/base/Button.vue'
import BaseCheckBox from '../../presentation/ui/components/base/Checkbox.vue'
import BaseChordDiagram from '../../presentation/ui/components/base/ChordDiagram.vue'
import BaseDropdown from '../../presentation/ui/components/base/Dropdown.vue'
import BaseInput from '../../presentation/ui/components/base/Input.vue'
import BaseLoading from '../../presentation/ui/components/base/Loading.vue'
import BaseModal from '../../presentation/ui/components/base/Modal.vue'
import BasePagination from '../../presentation/ui/components/base/Pagination.vue'
import BaseProgress from '../../presentation/ui/components/base/Progress.vue'
import BaseRadio from '../../presentation/ui/components/base/Radio.vue'
import BaseSelect from '../../presentation/ui/components/base/Select.vue'
import BaseSlider from '../../presentation/ui/components/base/Slider.vue'
import BaseSongSheet from '../../presentation/ui/components/base/SongSheet'
import BaseSwitch from '../../presentation/ui/components/base/Switch.vue'
import BaseTable from '../../presentation/ui/components/base/Table.vue'
import BaseToggle from '../../presentation/ui/components/base/Toggle.vue'

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
    Vue.component(BaseArea.name, BaseArea)
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
