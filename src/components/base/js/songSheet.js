// Dependencies
import ChordLyricsPair from '../ChordLyricsPair.vue'
import ChordDiagram from '../ChordDiagram.vue'
import SongSheetComment from '../SongSheetComment.vue'
import { chordTransposer } from '../../../utils'

// Component
export default {
  name: 'base-songsheet',
  components: { ChordLyricsPair, SongSheetComment, ChordDiagram },
  data: () => ({
    chords: [],
    parsedSong: '',
    chordsheet: {}
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
  methods: {
    componentFor (item) {
      return [ChordLyricsPair, SongSheetComment].find(c => c.for(item))
    }
  },
  watch: {
    song (val) {
      this.parsedSong = chordTransposer.plaintextToChordSheetHtml(val.body || '')
      this.chordsheet = chordTransposer.plainTextToSongObject(val.body || '')
      this.chords = chordTransposer.getUniqueChords(val.body || '')
    }
  }
}