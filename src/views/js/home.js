// Dependencies
import chordTransposer from '../../utils/chordTransposer'

// Component
export default {
  name: 'Home',
  mounted () {
    chordTransposer('pre').transpose()
  }
}
