// Dependencies
import { Chord } from 'chordsheetjs'
import { ChordBox } from 'vexchords'
import { chordsData } from '../../../../utils'

const ChordData = chordsData.ChordData

// Component
export default {
  name: 'base-chord-diagram',
  props: {
    as: {
      type: String,
      default: 'symbol'
    },
    name: {
      type: String,
      required: true
    },
    instrument: {
      type: String,
      default: 'guitar'
    },
    position: {
      type: Number,
      default: 0
    },
    width: {
      type: [Number, String],
      default: '50'
    },
    height: {
      type: [Number, String],
      default: '65'
    }
  },
  computed: {
    chord () {
      return Chord.parse(this.name)
    },
    chordData () {
      return ChordData.find(this.chord, this.instrument, this.position)
    },
    diagram () {
      if (!this.chordData) return ''
      const el = document.createElement('div')
      new ChordBox(el, {
        numStrings: this.chordData.strings,
        showTuning: false,
        width: this.width,
        height: this.height,
        defaultColor: 'currentColor'
      }).draw({
        chord: this.chordData.fingerings,
        position: this.chordData.data.baseFret,
        barres: this.chordData.barres
      })
      return el.querySelector('svg').innerHTML
    }
  }
}