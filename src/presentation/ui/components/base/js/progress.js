export default {
  name: 'base-progress',
  props: {
    striped: {
      type: Boolean,
      description: 'Whether progress is striped',
    },
    animated: {
      type: Boolean,
      description:
        'Whether progress is animated (works only with `striped` prop together)',
    },
    showPercentage: {
      type: Boolean,
      default: true,
      description: 'Whether progress bar should show percentage value',
    },
    height: {
      type: Number,
      default: 3,
      description: 'Progress line height',
    },
    label: {
      type: String,
      default: '',
      description: 'Progress label',
    },
    type: {
      type: String,
      default: 'default',
      description: 'Progress type (e.g danger, primary etc)',
    },
    value: {
      type: Number,
      default: 0,
      validator: (value) => {
        return value >= 0 && value <= 100
      },
      description: 'Progress value'
    }
  },
  computed: {
    computedClasses() {
      return [
        { 'progress-bar-striped': this.striped },
        { 'progress-bar-animated': this.animated },
        { [`bg-${this.type}`]: this.type }
      ]
    }
  }
}