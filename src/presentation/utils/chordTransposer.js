// Dependencies
import ChordSheetJS, { ChordProFormatter } from 'chordsheetjs'
import { Chord } from 'chordsheetjs'
import { getUniquesTyped } from './getUniques'

// Parser format for multi parser
const songParsers = [{
  name: 'ultimateguitar',
  pattern: /\[(Verse.*|Chorus)\]/i,
  parser: new ChordSheetJS.UltimateGuitarParser({ preserveWhitespace: false })
}, {
  name: 'chordpro',
  pattern: /{\w+:.*|\[[A-G].*\]/i,
  parser: new ChordSheetJS.ChordProParser()
}, {
  name: 'chordsheet',
  pattern: /.*/,
  parser: new ChordSheetJS.ChordSheetParser({ preserveWhitespace: false })
}]

/**
 * Detects song format and returnts the correct parser
 * @param {string} source - Raw song 
 * @returns {Parser} - Returns mathing parser
 */
function detectFormat (source) {
  if (!source) return
  return songParsers.find(({ pattern }) => source.match(pattern)).parser
}

/**
 * Detects song format and return it
 * @param {string} lyrics - raw song
 * @returns {string} Song type
 */
export const detecteSongFormat = (lyrics = '') => {
  if (!lyrics) return 'none'
  const formattedLyrics = lyrics.replaceAll('<br>', '\n').replace(/\r\n/gm, '\n')
  const format = songParsers.find(({ pattern }) => formattedLyrics.match(pattern)).name
  return format || 'none'
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
    const formatter = new ChordProFormatter()
    
    // Format song into html format
    const song = detectFormat(normalizedSong).parse(normalizedSong)
    return formatter.format(song).toString()

  } catch (err) {
    console.log('[parse error]', err)
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
    const chordsheetjsSong = detectFormat(song).parse(song)

    // Add transposed chord to song object
    const chords = {}
    chordsheetjsSong.lines.forEach(line => {
      line.items.forEach(pair => {
        if (pair.chords) {
          if (!chords[pair.chords]) {
            chords[pair.chords] = Chord.parse(pair.chords) ? Chord.parse(pair.chords).transpose(transpose).toString() : ''
          }
          pair.chords = chords[pair.chords]
        }
      })
    })

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
    const normalizedSong = lyrics.replace(/\r\n/gm, '\n')
    const song = detectFormat(normalizedSong).parse(normalizedSong)
        
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
 * Overwrites song base tone
 * @param {Song} song - Chordsheetjs song
 * @returns {Song} - Overwritten song
 */
export const overwriteBaseTone = (song) => {
  try {

    // Chordsheetjs utils
    const formatter = new ChordProFormatter()

    // Update song object
    song.lines.forEach(line => {
      line.items.forEach(pair => {
        if (pair.chords && pair.transposed) {
          pair.chords = pair.transposed
        }
      })
    })

    // Return updated song
    return formatter.format(song).toString()

  } catch (err) {
    console.log('[overwriteBasetone]', err)
    return {}
  }
}
