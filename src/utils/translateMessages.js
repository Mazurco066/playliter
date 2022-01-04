export const translateMessage = (message = '') => {
  if (message) {
    if (message.includes('required')) {
      return 'Esse campo é requerido'
    } else if (message.includes('email address')) {
      return 'Esse endereço de e-mail não é válido'
    } else if (message.includes('should be at least')) {
      const digit = message.replace(/[^0-9.]/g, '')
      return `Esse campo deve conter no mínimo ${digit} caractereres`
    } else if (message.includes('maximum length allowed')) {
      const digit = message.replace(/[^0-9.]/g, '')
      return `Esse campo deve conter no máximo ${digit} caractereres`
    } else {
      return message
    }
  }
  return ''
}
