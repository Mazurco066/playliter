// Dependencies
import httpClient from './_httpClient'

// Helper requests...
export const scrapSong = (url = '') =>
  httpClient.post('/helpers/scrap_song', { url })

export const dailyLiturgy = (date = '') =>
  httpClient.post('/helpers/daily_liturgy', { date })
