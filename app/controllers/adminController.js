const jwtProvider = require('jsonwebtoken');
const jwtUtil = require('../util/jwtUtil');
const {User} = require('../models/user');

class adminController {

    async renderIndex(req, res) {
        if (req.session.token) {
            var decodeToken = null;
            try {
                decodeToken = jwtProvider.verify(req.session.token, jwtUtil.jwtSecret);
                if (decodeToken.role == 'ADMIN') {
                    const user = await User.findByPk(decodeToken.userId);
                    res.render('admin/index', { username: user.username });
                }
                else {
                    res.redirect('/');
                }
            }
            catch (err) {
                console.error(`catch token err: ${err} for ${req.session.token}`);
                res.redirect('/user');
                return;
            }
        }
        else {
            res.redirect('/user');
        }
    }
}

module.exports = new adminController();