// Dependencies
import httpClient from './_httpClient'

// Account requests...
export const getAccountByUsername = (username = '') =>
  httpClient.post('/accounts/account_by_username', { username })

export const resendVerificationEmail = () =>
  httpClient.post('/accounts/resend_verification_email')

export const verifyAccount = (code = '') =>
  httpClient.post('/accounts/verify_account', { code })

export const addAccount = (data = {}) =>
  httpClient.post('/accounts', { ...data })

export const updateAccount = (accountId, data = {}) =>
  httpClient.put(`/accounts/${accountId}`, { ...data })

export const deleteAccount = (accountId) =>
  httpClient.delete(`/accounts/${accountId}`)

export const getAccount = (accountId) =>
  httpClient.get(`/accounts/get/${accountId}`)

export const getCurrentAccount = () =>
  httpClient.get(`/accounts/me`)
