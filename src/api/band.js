// Dependencies
import httpClient from './_httpClient'

// Band requests...
export const addBand = (data = {}) =>
  httpClient.post('/bands', { ...data })

export const updateBand = (bandId = '', data = {}) =>
  httpClient.put(`/bands/${bandId}`, { ...data })

export const deleteBand = (bandId = '') =>
  httpClient.delete(`/bands/${bandId}`)

export const getBand = (bandId = '') =>
  httpClient.get(`/bands/get/${bandId}`)

export const listBands = (limit = 0, offset = 0) =>
  httpClient.get(`/bands/get?limit=${limit}&offset=${offset}`)

// Invite requests...
export const inviteMember = (bandId = '', accountId = '') =>
  httpClient.post(`/bands/add_member/${bandId}`, { accountId })

export const promoteMember = (bandId = '', accountId = '') =>
  httpClient.post(`/bands/promote_member/${bandId}`, { accountId })

export const demoteMember = (bandId = '', accountId = '') =>
  httpClient.post(`/bands/demote_member/${bandId}`, { accountId })

export const removeMember = (bandId = '', accountId = '') =>
  httpClient.post(`/bands/remove_member/${bandId}`, { accountId })

export const respondInvite = ({ inviteId = '', response = 'accepted' }) =>
  httpClient.post('/invitations/respond', { inviteId, response })

export const getPendingInvites = () =>
  httpClient.get('/invitations/pending_invites')
  