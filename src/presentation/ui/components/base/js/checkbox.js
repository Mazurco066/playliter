// Dependencies
import { randomString } from '../../../../utils'

// Component
export default {
  name: 'base-checkbox',
  model: {
    prop: 'checked',
  },
  props: {
    checked: {
      type: [Array, Boolean],
      description: 'Whether checkbox is checked',
    },
    disabled: {
      type: Boolean,
      description: 'Whether checkbox is disabled',
    },
    inline: {
      type: Boolean,
      description: 'Whether checkbox is inline',
    },
  },
  data() {
    return {
      cbId: '',
      touched: false,
    }
  },
  computed: {
    model: {
      get() {
        return this.checked
      },
      set(check) {
        if (!this.touched) {
          this.touched = true
        }
        this.$emit('input', check)
      },
    },
  },
  mounted() {
    this.cbId = randomString()
  }
}
