// Dependencies
import { useCurrencyInput } from 'vue-currency-input'

// Currency input
export default {
  name: 'CurrencyInput',
  props: {
    modelValue: Number,
    options: Object,
    inputClasses: String
  },
  setup (props) {
    const {
      formattedValue,
      inputRef
    } = useCurrencyInput(props.options)
    
    return { inputRef, formattedValue }
  }
}
