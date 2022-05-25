import CurrencyInput from '../Currency.vue'
import { mask, masked } from 'vue-the-mask'

export default {
  directives: { mask, masked },
  components: { CurrencyInput },
  inheritAttrs: false,
  name: 'base-input',
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
    addonRightIcon: {
      type: String,
      description: 'Addon right icon'
    },
    addonLeftIcon: {
      type: String,
      description: 'Addont left icon'
    },
    mask: {
      type: [Array, String],
      description: 'Input Mask'
    },
    masked: {
      type: Boolean,
      description: 'Returns unmasked value',
      default: false
    },
    noMargin: {
      type: Boolean,
      description: 'Removes bottom margin',
      default: false
    },
    money: {
      type: Boolean,
      description: 'Money type for input',
      default: false
    },
    light: {
      type: Boolean,
      description: 'Applies black background to input',
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
    },
    listenersMoney() {
      return {
        input: this.onChangeMoney,
        focus: this.onFocus,
        blur: this.onBlur
      }
    },
    hasIcon() {
      const { addonRight, addonLeft } = this.$slots
      return (
        addonRight !== undefined ||
        addonLeft !== undefined ||
        this.addonRightIcon !== undefined ||
        this.addonLeftIcon !== undefined
      )
    },
  },
  methods: {
    updateValue(evt) {
      let value = evt.target.value && (!this.masked && this.mask)
        ? evt.target.value.replace(/\D/g, '')
        : evt.target.value
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
    onChangeMoney (evt) {
      if (evt) {
        let value = evt.target.value
        if (value) {
          this.$emit('update:modelValue', value)
        }
        if (!value && evt.inputType) {
          this.$emit('update:modelValue', '')
        }
      }
    }
  },
}
