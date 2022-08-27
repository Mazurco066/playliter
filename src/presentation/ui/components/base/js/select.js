export default {
  inheritAttrs: false,
  name: 'base-select',
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
    addonLeftIcon: {
      type: String,
      description: 'Addont left icon'
    },
    noMargin: {
      type: Boolean,
      description: 'Removes bottom margin',
      default: false
    },
    options: {
      type: Array,
      description: 'Options array: { value: Any, label: String }'
    },
    defaultOption: {
      type: String,
      description: 'Default option display'
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
    },
    hasIcon() {
      const { addonLeft } = this.$slots
      return (
        addonLeft !== undefined ||
        this.addonLeftIcon !== undefined
      )
    },
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
  },
}
