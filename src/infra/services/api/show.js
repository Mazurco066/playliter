// Dependencies
import httpClient from './_httpClient'

// Show requests...
export const addShow = (data = {}) =>
  httpClient.post(`/shows`, { ...data })

export const updateShow = (showId = '', data = {}) =>
  httpClient.put(`/shows/${showId}`, { ...data })

export const reorderShow = (showId = '', data = {}) =>
  httpClient.put(`/shows/${showId}/reorder`, { ...data })

export const deleteShow = (showId = '') =>
  httpClient.delete(`/shows/${showId}`)

export const getShow = (bandId = '', showId = '') =>
  httpClient.get(`/shows/get/${bandId}/${showId}`)

export const listShows = (bandId = '', limit = 0, offset = 0) =>
  httpClient.get(`/shows/get/${bandId}?limit=${limit}&offset=${offset}`)

export const listAccountShows = () =>
  httpClient.get(`/shows/account_shows`)

export const listFutureShows = () =>
  httpClient.get(`/shows/pending_shows`)

// Observation requests...
export const addShowObservation = (showId ='', data = {}) =>
  httpClient.post(`/shows/${showId}/add_observation`, { ...data })

export const updateShowObservation = (showId ='', observationId = '', data = {}) =>
  httpClient.put(`/shows/${showId}/${observationId}/update_observation`, { ...data })

export const removeShowObservation = (showId ='', observationId = '') =>
  httpClient.post(`/shows/${showId}/${observationId}/remove_observation`)

// Song interaction requests...
export const linkSong = (showId = '', songId = '') =>
  httpClient.patch(`/shows/${showId}/link_song`, { songId })

export const unlinkSong = (showId = '', songId = '') =>
  httpClient.patch(`/shows/${showId}/unlink_song`, { songId })
