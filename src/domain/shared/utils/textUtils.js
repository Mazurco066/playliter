export const formatCurrency = (value, options = {
  currency: 'BRL',
  style: 'currency'
}) => new Intl.NumberFormat('pt-BR', options).format(value)

export const formatCnpjCpf = (value) => {
  const cnpjCpf = value.replace(/\D/g, '')
  if (value.length === 11) {
    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3-\$4')
  } else {
    return cnpjCpf.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g, '\$1.\$2.\$3/\$4-\$5')
  }
}

export const formatPhone = (value) => {
  const phone = value.replace(/\D/g, '')
  return phone
    .replace(/^(\d{2})(\d)/g,"($1) $2")
    .replace(/(\d)(\d{4})$/,"$1-$2")
}

export const formatISODate = (value) => {
  return value.split('T')[0].split('-').reverse().join('/')
}

export const formatISODateTime = (value) => {
  return `${value.split('T')[0].split('-').reverse().join('/')} ${value.split('T')[1]}`
}

export const truncate = (value, length) => {
  if (value.length > length) return value.substring(0, length) + '...'
  return value
}
