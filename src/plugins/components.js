// Dependencies
import BaseButton from '../components/base/Button.vue'
import BaseCheckBox from '../components/base/Checkbox.vue'
import BaseDropdown from '../components/base/Dropdown.vue'
import BaseEditor from '../components/base/Editor.vue'
import BaseInput from '../components/base/Input.vue'
import BaseLoading from '../components/base/Loading.vue'
import BaseModal from '../components/base/Modal.vue'
import BasePagination from '../components/base/Pagination.vue'
import BaseProgress from '../components/base/Progress.vue'
import BaseRadio from '../components/base/Radio.vue'
import BaseSelect from '../components/base/Select.vue'
import BaseSlider from '../components/base/Slider.vue'
import BaseSwitch from '../components/base/Switch.vue'
import BaseTable from '../components/base/Table.vue'
import BaseToggle from '../components/base/Toggle.vue'

// Components
export default {
  install (Vue) {
    Vue.component(BaseInput.name, BaseInput)
    Vue.component(BaseCheckBox.name, BaseCheckBox)
    Vue.component(BaseDropdown.name, BaseDropdown)
    Vue.component(BaseEditor.name, BaseEditor)
    Vue.component(BaseButton.name, BaseButton)
    Vue.component(BaseLoading.name, BaseLoading)
    Vue.component(BaseModal.name, BaseModal)
    Vue.component(BasePagination.name, BasePagination)
    Vue.component(BaseProgress.name, BaseProgress)
    Vue.component(BaseRadio.name, BaseRadio)
    Vue.component(BaseSelect.name, BaseSelect)
    Vue.component(BaseSlider.name, BaseSlider)
    Vue.component(BaseSwitch.name, BaseSwitch)
    Vue.component(BaseTable.name, BaseTable)
    Vue.component(BaseToggle.name, BaseToggle)
  }
}
