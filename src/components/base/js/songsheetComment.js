// Dependencies
import { Tag } from 'chordsheetjs'

// Component
export default {
  name: 'SongsheetComment',
  for: function (item) {
    return item instanceof Tag && item.name === 'comment'
  },
  props: {
    item: Tag
  }
}
