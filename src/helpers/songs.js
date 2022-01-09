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
