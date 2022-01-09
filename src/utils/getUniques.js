// Get uniques on root object
const getUniques = (array, element) =>
  array
    .map(item => item[element])
    .filter((value, index, self) => self.indexOf(value) === index)

// Get uniques including a subkey
const getUniquesInside = (array, element1, element2) =>
  array
    .map(item => item[element1][element2])
    .filter((value, index, self) => self.indexOf(value) === index)

// Exporting named
export { getUniquesInside }
export default getUniques
