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

module.exports = {
    jwtSecret: 'sGZ5UQpT9LXzasmmcoZbpKxXNZ9Dj3xqt1pa365kK8NO/23nnSaymAoRsdrJFNQbD6bwWnPLeQDocQ3bHNefQfCWMDmM+sq2jvCFOlTxSiut68FP/rf2awHknPYXWiXlrH2df9Zn5vx7p18GmUW46dDUsvqQnvCukCc85AqM3C1xVoc42ZdcWPisAuIlazGcY4rC9xduYh6aiFg4BXr022KRxiIDQxE6U28Na3KqWL2nqYcQTl/kPFlm7BLWsz4kCDI+W4imNaam4cwD3y+c6uavLUcWQuL5K+WQLJZnjy0wRmGZFdPr0zlIMWJHdh6Hnpw8OCYd+7aqHbnAbwbe7A==',
    emailValidate,
    passwordValidate,
};