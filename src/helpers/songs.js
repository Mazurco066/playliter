// Dependencies
import { getUniquesInside } from '../utils'

/**
 *  Groups songs by category
 * @param {Array} items - Array of songs 
 * @returns Grouped songs array
 */
export const compute = items => {

  // Extract items by category
  const uniques = getUniquesInside(items, 'category', 'id')

  // Group items by category
  const songs = uniques.map(category => {
    const list = items.filter(i => i.category.id === category)
    const cat = list[0].category
    return {
      categoryId: category,
      category: cat,
      items: list,
      numberOfItems: list.length
    }
  })

  // Return global list
  return {
    songs,
    numberOfItems: songs.reduce((ac, cv) => ac + cv.numberOfItems, 0)
  }
}

/**
 * Append songs by category
 * @param {Object} computed - Computed songs
 * @param {Array} items - Array of songs 
 * @returns Grouped songs array
 */
export const append = (computed, items) => {

  // Extract items by category
  const uniques = getUniquesInside(items, 'category', 'id')

  // Group items by category
  const songs = uniques.map(category => {
    const list = items.filter(i => i.category.id === category)
    const cat = list[0].category
    return {
      categoryId: category,
      category: cat,
      items: list,
      numberOfItems: list.length
    }
  })

  // Append to current array
  let currentSongs = computed ? [ ...computed.songs ] : []
  songs.forEach(newSongs => {
    const hasCategory = currentSongs.find(c => c.categoryId === newSongs.categoryId)
    if (!hasCategory) {
      currentSongs.push(newSongs)
    } else {
      const categoryIndex = currentSongs.indexOf(hasCategory)
      const updatedList = [ ...hasCategory.items, ...newSongs.items ]
      currentSongs[categoryIndex] = {
        ...hasCategory,
        items: updatedList,
        numberOfItems: updatedList.length
      }
    }
  })

  // Return updated list
  return {
    songs: currentSongs,
    numberOfItems: currentSongs.reduce((ac, cv) => ac + cv.numberOfItems, 0)
  }
}
