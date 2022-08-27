// Dependencies
import { ChordLyricsPair } from 'chordsheetjs'
import SongSheetChord from '../SongSheetChord.vue'

// Component
export default {
  name: 'ChordLyricsPair',
  components: { SongSheetChord },
  for: function (item) {
    return item instanceof ChordLyricsPair
  },
  props: {
    item: ChordLyricsPair
  }
}
