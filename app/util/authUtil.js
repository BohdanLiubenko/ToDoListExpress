const emailValidate = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

const passwordValidate = (password) => {
  if (password.length < 8) {
    return 'Password must be at least 8 characters long'
  }

  if (!/[A-Z]/.test(password)) {
    return 'Password must contain uppercase letters'
  }

  if ((password.match(/[0-9]/g) || []).length < 3) {
    return 'Password must contain numbers(at least 3)'
  }

  return true
}

module.exports = { emailValidate, passwordValidate }
