// Util methods
function getRandomArbitrary(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

/**
 * Generates a random hex color
 * @returns {string} Random color hex
 */
export function getRandomColor() {
  var letters = '0123456789ABCDEF'
  var color = '#'
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

/**
 * Generates a random card hex color
 * @returns {string} Random color hex
 */
export function getRandomCardColor() {
  const colors = ['#d0021b', '#252525', '#01b7ae', '#F6D40F', '#4C0DD4', '#0F96F6']
  const rng = getRandomArbitrary(0, 6)
  const color = colors[rng]
  return color
}
