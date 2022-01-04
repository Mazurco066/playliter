// Return sort icon
export const sortIconClass = (field, current, order) => (field === current)
  ? order === 1
    ? 'fa-long-arrow-alt-down'
    : 'fa-long-arrow-alt-up'
  : 'fa-arrows-alt-v'

export const sortIconClassPaginated = (field, current) => (field === current)
  ? 'fa-long-arrow-alt-down'
  : 'fa-arrows-alt-v'
