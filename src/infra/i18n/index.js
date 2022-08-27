// Dependencies
import { createI18n } from 'vue3-i18n'

// Langs
import brJsonMessages from './lang/br.json'
import enJsonMessages from './lang/en.json'

// Merge langs
const jsonMessages = {
  pt: brJsonMessages,
  en: enJsonMessages
}

// Define messages and overwrite if needed
const messages = {...jsonMessages }

// Retrieve current location
const getLang = () => (
  navigator.language ||
  navigator.browserLanguage ||
  (navigator.languages || ['en-US'])[0]
).split('-')[0]

// Create i18n instance
const i18n = createI18n({ locale: getLang(), messages })

// Exporting created i18n
export default i18n
