// Dependencies
import ChordLyricsPair from '../ChordLyricsPair.vue'
import ChordDiagram from '../ChordDiagram.vue'
import SongSheetComment from '../SongSheetComment.vue'
import { Chord } from 'chordsheetjs'
import { chordTransposer } from '../../../../utils'

// Component
export default {
  name: 'base-songsheet',
  components: { ChordLyricsPair, SongSheetComment, ChordDiagram },
  data: () => ({
    chords: [],
    chordsheet: {},
    transpose: 0,
    chordsCollapsed: true
  }),
  computed: {
    transpositions () {
      const baseTone = this.song.tone
      const key = Chord.parse(baseTone)
      const steps = []
      for (let i = -11; i <= 11; i++) {
        steps.push({
          step: i,
          name: key.transpose(i)
        })
      }
      return steps
    }
  },
  emits: [
    'toneUpdated'
  ],
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
    },
    showToneControl: {
      type: Boolean,
      default: true
    },
    showChordList: {
      type: Boolean,
      default: true
    },
    canUpdateBaseTone: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    componentFor (item) {
      return [ChordLyricsPair, SongSheetComment].find(c => c.for(item))
    },
    toneDown () {
      if (this.transpose === -11) this.transpose = 11
      else this.transpose--
    },
    toneUp () {
      if (this.transpose === 11) this.transpose = -11
      else this.transpose++
    },
    toggleChordsCollapse () {
      this.chordsCollapsed = !this.chordsCollapsed
    }
  },
  watch: {
    song (val) {
      this.transpose = 0
      this.chordsheet = chordTransposer.getTransposedSong(val.body || '', this.transpose) 
      this.chords = chordTransposer.getUniqueChords(val.body || '', this.transpose)
    },
    transpose (val) {
      this.chordsheet = chordTransposer.getTransposedSong(this.song.body || '', this.transpose)
      this.chords = chordTransposer.getUniqueChords(this.song.body || '', val)
    }
  }
}