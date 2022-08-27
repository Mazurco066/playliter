export default {
  inheritAttrs: false,
  name: 'base-slider',
  props: {
    required: {
      type: Boolean,
      description: 'Whether input is required (adds an asterix *)'
    },
    valid: {
      type: Boolean,
      description: 'Whether is valid',
      default: undefined
    },
    label: {
      type: String,
      description: 'Input label (text before input)'
    },
    error: {
      type: String,
      description: 'Input error (below input)'
    },
    formClasses: {
      type: String,
      description: 'Form css classes'
    },
    labelClasses: {
      type: String,
      description: 'Input label css classes'
    },
    inputClasses: {
      type: String,
      description: 'Input css classes'
    },
    modelValue: {
      type: [String, Number],
      description: 'Input value'
    },
    noMargin: {
      type: Boolean,
      description: 'Removes bottom margin',
      default: false
    }
  },
  data() {
    return {
      focused: false,
    }
  },
  computed: {
    listeners() {
      return {
        input: this.updateValue,
        focus: this.onFocus,
        blur: this.onBlur,
      }
    }
  },
  methods: {
    updateValue(evt) {
      let value = evt.target.value
      this.$emit('update:modelValue', value)
    },
    onFocus(value) {
      this.focused = true
      this.$emit('focus', value)
    },
    onBlur(value) {
      this.focused = false
      this.$emit('blur', value)
    },
  }
}
