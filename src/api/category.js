// Dependencies
import httpClient from './_httpClient'

// Category requests...
export const addCategory = (bandId = '', data = {}) =>
  httpClient.post(`/categories/${bandId}`, { ...data })

export const updateCategory = (categoryId = '', data = {}) =>
  httpClient.put(`/categories/${categoryId}`, { ...data })

export const deleteCategory = (categoryId = '') =>
  httpClient.delete(`/categories/${categoryId}`)

export const getCategory = (bandId = '', categoryId = '') =>
  httpClient.get(`/categories/get/${bandId}/${categoryId}`)

export const listCategories = (bandId = '', limit = 0, offset = 0) =>
  httpClient.get(`/categories/get/${bandId}?limit=${limit}&offset=${offset}`)
