// Dependencies
import { tunerUtils } from '../../../../../domain/shared/utils'
import TunerMeter from '../TunerMeter.vue'
import TunerNote from '../TunerNote.vue'

// Component
export default {
  name: 'WebTuner',
  components: { TunerMeter, TunerNote },
  data () {
    return {
      a4: 440,
      note: { name: 'A', frequency: 440, octave: 4, cents: 0 },
      active: false,
    }
  },
  computed: {
    tuner () {
      return new tunerUtils.Tuner(this.a4)
    },
    notes () {
      const minOctave = 2
      const maxOctave = 5
      const notes = []

      for (let octave = minOctave; octave <= maxOctave; octave += 1) {
        for (let n = 0; n < 12; n += 1) {
          const value = 12 * (octave + 1) + n
          notes.push({
            name: this.tuner.noteStrings[n],
            octave: octave.toString(),
            frequency: this.tuner.getStandardFrequency(value)
          })
        }
      }
      
      return notes
    }
  },
  methods: {
    toggle () {
      return this.active ? this.stop() : this.start()
    },
    async start () {
      this.active = true
      return this.tuner.start(n => { this.note = n }).then(() => {
        this.frequencyData = new Uint8Array(this.tuner.analyser.frequencyBinCount)
        this.updateFrequencyBars()
      })
    },
    async stop () {
      this.active = false
      await this.tuner.stop()
      Object.assign(this.$data, this.$options.data())
    },
    updateFrequencyBars () {
      if (!this.active) return

      this.tuner.analyser.getByteFrequencyData(this.frequencyData)
      const el = this.$refs['frequency-bars']
      const length = 64 // low frequency only
      const width = el.width / length - 0.5

      window.frequencyData = this.frequencyData
      const scale = el.height / Math.max(...this.frequencyData.slice(0, length))

      const canvasContext = el.getContext('2d')
      canvasContext.clearRect(0, 0, el.width, el.height)

      for (let i = 0; i < length; i += 1) {
        canvasContext.fillStyle = 'rgb(120,120,120)'
        canvasContext.fillRect(
          i * (width + 0.5),
          el.height - Math.floor(this.frequencyData[i] * scale),
          width,
          Math.floor(this.frequencyData[i] * scale)
        )
      }

      requestAnimationFrame(this.updateFrequencyBars.bind(this))
    }
  }
}