// Dependencies
import { randomString } from '../../../../../domain/shared/utils'

// Component
export default {
  name: 'base-radio',
  props: {
    name: {
      type: [String, Number],
      description: 'Radio label',
    },
    disabled: {
      type: Boolean,
      description: 'Whether radio is disabled',
    },
    value: {
      type: [String, Boolean],
      description: 'Radio value',
    },
    inline: {
      type: Boolean,
      description: 'Whether radio is inline',
    },
  },
  data() {
    return {
      cbId: '',
    }
  },
  computed: {
    model: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
    inlineClass() {
      if (this.inline) {
        return `form-check-inline`
      }
      return ''
    },
  },
  mounted() {
    this.cbId = randomString()
  },
}
