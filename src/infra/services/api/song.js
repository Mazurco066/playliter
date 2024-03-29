// Dependencies
import httpClient from './_httpClient'

// Song requests...
export const addSong = (bandId = '', data = {}) =>
  httpClient.post(`/songs/${bandId}`, { ...data })

export const updateSong = (songId = '', data = {}) =>
  httpClient.put(`/songs/${songId}`, { ...data })

export const deleteSong = (songId = '') =>
  httpClient.delete(`/songs/${songId}`)

export const getSong = (songId = '') =>
  httpClient.get(`/songs/${songId}`)

export const listBandSongs = (bandId = '', filter = '', limit = 0, offset = 0) =>
  httpClient.get(`/songs/list/${bandId}?filter=${encodeURI(filter)}&limit=${limit}&offset=${offset}`)

export const listPublicSongs = (filter = '', limit = 0, offset = 0) =>
  httpClient.get(`/songs/get/public_songs?filter=${encodeURI(filter)}&limit=${limit}&offset=${offset}`)
