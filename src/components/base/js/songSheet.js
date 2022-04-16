// Dependencies
import { chordTransposer } from '../../../utils'

// Component
export default {
  name: 'base-songsheet',
  data: () => ({
    chords: [],
    parsedSong: ''
  }),
  props: {
    song: {
      type: Object,
      default: {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    showHeader: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    song (val) {
      this.parsedSong = chordTransposer.plaintextToChordSheetHtml(val.body || '')
      this.chords = chordTransposer.getUniqueChords(val.body || '')
    }
  }
}