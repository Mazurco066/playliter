// Components
export default {
  name: 'TunerNote',
  emits: ['select'],
  props: {
    active: Boolean,
    name: {
      type: String,
      required: true
    },
    octave: {
      type: String,
      required: true
    },
    frequency: {
      type: Number,
      required: true
    }
  },
  methods: {
    activate () {
      if (!this.active) return
      const parent = this.$el.parentElement
      parent.scrollLeft = this.$el.offsetLeft - (parent.clientWidth - (this.$el.clientWidth / 2)) / 2
    },
    select () {
      this.$emit('select', this.$data)
    }
  },
  mounted () {
    this.activate()
  },
  watch: {
    active: 'activate'
  }
}
