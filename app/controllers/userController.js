const { User } = require('../models/user');
const bcrypt = require('bcryptjs');
const jwtProvider = require('jsonwebtoken');
const jwtUtil = require('../util/jwtUtil');

class userController {
    async register(req, res, next) {
        try {
            const { email, password, username } = req.body;
            let errors = {};
            if (!jwtUtil.emailValidate(email)) {
                errors.email = 'Invalid email';
            }
            if (!jwtUtil.passwordValidate(password)) {
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

                req.session.token = jwtProvider.sign({ userId: user.id, role: user.role }, jwtUtil.jwtSecret, { expiresIn: '1h' });

                res.redirect('/');
            }
        }
        catch (error) {
            next(error);
        }
    }

    async login(req, res, next) {
        try {
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

                req.session.token = jwtProvider.sign({ userId: user.id, role: user.role }, jwtUtil.jwtSecret, { expiresIn: '1h' });

                res.redirect('/');
            }
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        req.session.token = null;
        res.redirect('/');
    }
}

module.exports = new userController();