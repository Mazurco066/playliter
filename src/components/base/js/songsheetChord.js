// Dependencies
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

// Component
export default {
  name: 'SongSheetChord',
  components: { Popover, PopoverButton, PopoverPanel },
  props: {
    name: {
      type: [String, undefined],
      default: undefined
    }
  }
}
