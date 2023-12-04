const emailValidate = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const passwordValidate = (password) => {
    if (password.length < 8) {
        return false;
    }

    if (!/[A-Z]/.test(password)) {
        return false;
    }

    if ((password.match(/[0-9]/g) || []).length < 3) {
        return false;
    }

    return true;
}

module.exports = { emailValidate, passwordValidate };