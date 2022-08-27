// Dependencies
import httpClient from './_httpClient'

// Auth requests...
export const signIn = ({ username, password }) =>
  httpClient.post('/auth/authenticate', { username, password })

export const forgotPassword = (email = '') =>
  httpClient.post('/auth/forgot_password', { email })

export const resetPassword = (accountId = '', { token = '', newPassword = '' }) =>
  httpClient.post(`/auth/reset_password/${accountId}`, { token, newPassword })
