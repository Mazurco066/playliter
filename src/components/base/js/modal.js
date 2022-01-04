export default {
  name: 'base-modal',
  props: {
    show: Boolean,
    showClose: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: '',
      validator(value) {
        let acceptedValues = ['', 'notice', 'mini']
        return acceptedValues.indexOf(value) !== -1
      },
      description: 'Modal type (notice|mini|"") ',
    },
    modalClasses: {
      type: [Object, String],
      description: 'Modal dialog css classes',
    },
    modalContentClasses: {
      type: [Object, String],
      description: 'Modal dialog content css classes',
    },
    gradient: {
      type: String,
      description: 'Modal gradient type (danger, primary etc)',
    },
    headerClasses: {
      type: [Object, String],
      description: 'Modal Header css classes',
    },
    bodyClasses: {
      type: [Object, String],
      description: 'Modal Body css classes',
    },
    footerClasses: {
      type: [Object, String],
      description: 'Modal Footer css classes',
    },
    animationDuration: {
      type: Number,
      default: 500,
      description: 'Modal transition duration',
    },
  },
  methods: {
    closeModal() {
      this.$emit('update:show', false)
      this.$emit('close')
    }
  },
  watch: {
    show(val) {
      let documentClasses = document.body.classList
      if (val) {
        documentClasses.add('modal-open')
      } else {
        documentClasses.remove('modal-open')
      }
    },
  }
}