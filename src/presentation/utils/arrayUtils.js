// Sorts array data by field
export const sortArray = (data = [], field, order = 1, parser) => {
  // Retrieve key value
  const key = parser
    ? (x, prop) => parser(x[prop])
    : (x, prop) => x[prop]

  // Sort function
  const sorter = (a, b) => {
    return a = key(a, field), b = key(b, field), order * ((a > b) - (b > a))
  }

  // Sort array
  return data.sort(sorter)
}
