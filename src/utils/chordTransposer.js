// Dependencies
import { ChordSheetParser, HtmlDivFormatter, ChordProParser, ChordProFormatter } from 'chordsheetjs'
import { Chord } from 'chordsheetjs'
import { getUniquesTyped } from './getUniques'

// Constants
const chordRegex = /((?!(?=[ÇçáéíóúÁÉÍÓÚ]))(((\b([A-G]{1,1}((?!([\scefghiklnopqrtuvxwyz]))((add|ADD)|#m|#|º|b)?([2-9]|m(\B|$)|maj|sus|dim|\(|º)?(\/[A-G][2-9](#|º)?(b{1,1})?)?(\+)?(\/([A-G]|[2-9]))?(º|#|b|\([2-9]\))?([2-9]|m)?(\+|(?=[2-9])M)?(11|13)?(\/)?([A-G])?)([Eb|Bb])?(\([0-9]?[0-9]?(\/)?[0-9]?[0-9]?)?(\/1[1-9])?\b(\(((2|4|5|6|7|9|11|13)|[bB][2-9])\))?(-|\/[A-G])?(\/[2-9])?([2-9]|\)|\((b13|b11|b5)\)|\([2-9]\)|-|\/)?(\+)?)(m|b|º|#|13|add[2-9]\))?)|\b((?=(?=\s)[A-G](?=\s)))[A-G](?!(\s)?[a-zH-Z])\b)(º)?)((\(([0-9]{1,2})?(\-)?(\+)?\))|(?!((?:[çáéíóúÇÁÉÍÓÚ])|((\t|\s)[a-zA-Z][A-Z]|\s[A-G][a-z]\w|\s[A-G]\s\w[H-Z])\w?)))|((?=(?=\s)[A-G]M|[A-G]m|[A-G]m(?=\s)))([A-G]m|[A-G]M(?!\s))(#|b)?([2-9]|maj|sus|dim|º|º)?(\/[A-G][2-9](#)?(b{1,1})?)?(\+)?(\/([A-G]|[2-9]))?(#|b|\([2-9]\))?([2-9])?(\+)?(\([A-G][2-9]\))?(\([1-9][1-9]?\))?(11|13)?(-|\/[A-G])?(\/[2-9])?([2-9]|-|\/)?(\+)?(b|#|13)?(?!(\s)?[a-zH-Z])(?!(?:[,çáéíóúÇÁÉÍÓÚ]))\W)/g

// Parsers
// const PARSERS = [
//   {
//     pattern: /\[(Verse.*|Chorus)\]/i,
//     parser: new UltimateGuitarParser()
//   },
//   {
//     pattern: /{\w+:.*|\[[A-G].*\]/i,
//     parser: new ChordProParser()
//   },
//   {
//     pattern: /.*/,
//     parser: new ChordSheetParser()
//   }
// ]

/**
 * Replace chords on a musical sheet
 * @param {string} lyrics - raw song
 * @returns {string} formatted html
 */
export const plaintextToPreHtml = (lyrics = '') => {
  return lyrics.replace(chordRegex, '<b class="chord">$1</b>')
}

/**
 * Converts a plaintext song to html format
 * @param {string} lyrics - raw song
 * @returns {string} formatted html
 */
export const plaintextToChordSheetHtml = (lyrics = '') => {
  try {

    // Chordsheetjs utils
    const normalizedSong = lyrics.replaceAll('<br>', '\n').replace(/\r\n/gm, '\n')
    const parser = new ChordSheetParser()
    const formatter = new HtmlDivFormatter()

    // Format song into html format
    const song = parser.parse(normalizedSong)
    return formatter.format(song)

  } catch (err) {
    console.log('[parse error]', err)
    return lyrics
  }
}

/**
 * Converts a plaintext song to html format
 * @param {string} lyrics - raw song
 * @returns {string} formatted html
 */
 export const plaintextToChordProFormat = (lyrics = '') => {
  try {

    // Chordsheetjs utils
    const normalizedSong = lyrics.replaceAll('<br>', '\n').replace(/\r\n/gm, '\n')
    const parser = new ChordSheetParser({ preserveWhitespace: false })
    const formatter = new ChordProFormatter()

    // Format song into html format
    const song = parser.parse(normalizedSong)
    return formatter.format(song).toString()

  } catch (err) {
    console.log('[parse error]', err)
    return lyrics
  }
}

/**
 * Converts a plaintext song into a Song object
 * @param {string} lyrics - raw song
 * @returns {Song} parsed song
 */
export const plainTextToSongObject = (lyrics = '') => {
  try {

    // Chordsheetjs utils
    const normalizedSong = lyrics.replace(/\r\n/gm, '\n')
    const parser = new ChordSheetParser()

    // Format song into html format
    return parser.parse(normalizedSong)

  } catch (err) {
    console.log('[plainTextToSongObject]', err)
    return lyrics
  }
}

/**
 * Converts a plaintext song to chords array
 * @param {string} lyrics - raw song
 * @returns {Array} containing unique chords
 */
export const getUniqueChords = (lyrics = '', transpose = 0) => {
  try {

    // Chordsheetjs utils
    const song = lyrics.replace(/\r\n/gm, '\n')
    const parser = new ChordProParser()
    const chordsheetjsSong = parser.parse(song)

    // Retrieve song chords
    const allChordsGrouped = chordsheetjsSong.lines.map(
      line => line.items.reduce((ac, cv) => cv.chords ? ac.concat(cv.chords.replace(/\s/g, '')) : ac , [])
    )

    // Filter chords
    const allChords = [].concat(...allChordsGrouped).filter(a => a)
    const uniqueChords = getUniquesTyped(allChords)
    return uniqueChords

  } catch (err) {
    console.log('[getUniqueChords]', err)
    return []
  }
}

/**
 * Converts a plaintext song to chords array
 * @param {string} lyrics - raw song
 * @returns {Array} containing chords
 */
export const getTransposedSong = (lyrics = '', transpose = 0) => {
  try {

    // Chordsheetjs utils
    const parser = new ChordProParser()
    const song = parser.parse(lyrics.replace(/\r\n/gm, '\n'))
        
    // Add transposed chord to song object
    const chords = {}
    song.lines.forEach(line => {
      line.items.forEach(pair => {
        if (pair.chords) {
          if (!chords[pair.chords]) {
            chords[pair.chords] = Chord.parse(pair.chords) ? Chord.parse(pair.chords).transpose(transpose).toString() : ''
          }
          pair.transposed = chords[pair.chords]
        }
      })
    })

    // Return modified song
    return song

  } catch (err) {
    console.log('[getTransposedSong]', err)
    return []
  }
}

/**
 * Formats a parsed song to html
 * @param {object} song - Parsed song
 * @returns {string} song html
 */
export const getTransposedHtml = (song) => {
  try {
  
    // Chordsheetjs format parsed song
    const formatter = new HtmlDivFormatter()
    return formatter.format(song)

  } catch (err) {
    console.log('[getTransposedHtml]', err)
    return lyrics
  }
}
