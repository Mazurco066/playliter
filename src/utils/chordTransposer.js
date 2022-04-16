// Dependencies
import { ChordSheetParser, HtmlDivFormatter } from 'chordsheetjs'
import { getUniquesTyped } from './getUniques'

// Constants
const chordRegex = /((?!(?=[ÇçáéíóúÁÉÍÓÚ]))(((\b([A-G]{1,1}((?!([\scefghiklnopqrtuvxwyz]))((add|ADD)|#m|#|º|b)?([2-9]|m(\B|$)|maj|sus|dim|\(|º)?(\/[A-G][2-9](#|º)?(b{1,1})?)?(\+)?(\/([A-G]|[2-9]))?(º|#|b|\([2-9]\))?([2-9]|m)?(\+|(?=[2-9])M)?(11|13)?(\/)?([A-G])?)([Eb|Bb])?(\([0-9]?[0-9]?(\/)?[0-9]?[0-9]?)?(\/1[1-9])?\b(\(((2|4|5|6|7|9|11|13)|[bB][2-9])\))?(-|\/[A-G])?(\/[2-9])?([2-9]|\)|\((b13|b11|b5)\)|\([2-9]\)|-|\/)?(\+)?)(m|b|º|#|13|add[2-9]\))?)|\b((?=(?=\s)[A-G](?=\s)))[A-G](?!(\s)?[a-zH-Z])\b)(º)?)((\(([0-9]{1,2})?(\-)?(\+)?\))|(?!((?:[çáéíóúÇÁÉÍÓÚ])|((\t|\s)[a-zA-Z][A-Z]|\s[A-G][a-z]\w|\s[A-G]\s\w[H-Z])\w?)))|((?=(?=\s)[A-G]M|[A-G]m|[A-G]m(?=\s)))([A-G]m|[A-G]M(?!\s))(#|b)?([2-9]|maj|sus|dim|º|º)?(\/[A-G][2-9](#)?(b{1,1})?)?(\+)?(\/([A-G]|[2-9]))?(#|b|\([2-9]\))?([2-9])?(\+)?(\([A-G][2-9]\))?(\([1-9][1-9]?\))?(11|13)?(-|\/[A-G])?(\/[2-9])?([2-9]|-|\/)?(\+)?(b|#|13)?(?!(\s)?[a-zH-Z])(?!(?:[,çáéíóúÇÁÉÍÓÚ]))\W)/g
// const chordRegex = /([ABCDEFG](?!\h{1}[a-zA-Z][a-z]+))(#|##|b|bb)?(maj|min|M|m|sus)?(aug|dim|ø)?([0-9][0-9]?)?(alt)?(#|##|b|bb)?([0-9])?([\),-]?\s+|[\/])/g
// /[A-G](b|#)?(maj|min|m|M|\+|-|dim|aug){1}?[0-9]*(sus)?[0-9]*(\/[A-G](b|#){1}?)?/g

/**
 * Replace chords on a musical sheet
 * @param {string} lyrics - raw song
 * @returns {string} formatted html
 */
export const plaintextToPreHtml = (lyrics = '') => {
  return lyrics.replace(chordRegex, '<b class="chord">$1</b>')
}

/**
 * 
 * @param {string} lyrics - raws ong
 * @returns {string} formatted html
 */
export const plaintextToChordSheetHtml = (lyrics = '') => {
  try {

    // Chordsheetjs utils
    const normalizedSong = lyrics.replaceAll('<br>', '\n')
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
 * 
 * @param {string} lyrics - raw song
 * @returns {Array} containing unique chords
 */
export const getUniqueChords = (lyrics = '') => {
  try {

    // Chordsheetjs utils
    const song = lyrics.replaceAll('<br>', '\n')
    const parser = new ChordSheetParser()
    const chordsheetjsSong = parser.parse(song)

    // Retrieve song chords
    const allChordsGrouped = chordsheetjsSong.lines.map(
      line => line.items.reduce((ac, cv) => ac.concat(cv.chords.replace(/\s/g, '')) , [])
    )

    // Filter chords
    const allChords = [].concat(...allChordsGrouped).filter(a => a)
    const uniqueChords = getUniquesTyped(allChords)
    return uniqueChords

  } catch (err) {
    console.log('[parse error]', err)
    return []
  }
}
