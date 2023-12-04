const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const  authUtil = require('../util/authUtil');

class userController {
    async register(req, res, next) {
        const { email, password, username } = req.body;
        let errors = {};
        if (!authUtil.emailValidate(email)) {
            errors.email = 'Invalid email';
        }
        if (!authUtil.passwordValidate(password)) {
            errors.password = 'Invalid password';
        }
        if (Object.values(errors).length > 0) {
            res.render('user/register', { errors });
        }
        else {
            const hashPassword = await bcrypt.hash(password, 10);

            const user = await User.create({
                email: email,
                password: hashPassword,
                username: username
            });

            req.session.user = user;
            res.redirect('/');
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        let error = '';

        const user = await User.findOne({ where: { email } });

        if (!user) {
            error = 'No user with such email';
        } else if (!await bcrypt.compare(password, user.password)) {
            error = 'Password not right';
        }

        if (error != '') {
            res.render('user/login', { error });
        }
        else {
            req.session.user = user;

            res.redirect('/');
        }
    }

    async logout(req, res, next) {
        req.session.user = null;
        res.redirect('/');
    }

    async rendeRegister(req, res, next) {
        res.render('user/register', { errors: {} });
    }

    async rendeLogin(req, res, next) {
        res.render('user/login', { error: '' });
    }
}

module.exports = new userController();