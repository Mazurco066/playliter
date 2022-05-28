// Component
export default {
  name: 'TunerMeter',
  props: {
    cents: {
      type: Number,
      required: true
    }
  },
  computed: {
    degrees () {
      return (this.cents / 50) * 45
    },
    transform () {
      return 'rotate(' + this.degrees + 'deg)'
    },
    left () {
      return (this.cents + 50) + '%'
    }
  },
  mounted () {
    for (let i = 0; i <= 10; i += 1) {
      const $scale = document.createElement('div')
      $scale.className = 'meter-scale'
      $scale.style.left = (i * 10) + '%'
      if (i % 5 === 0) {
        $scale.classList.add('meter-scale-strong')
      }
      this.$el.appendChild($scale)
    }
  }
}
