const { User } = require('../models/user');

class adminController {

    async renderIndex(req, res) {

        if (req.session.user.role == 'ADMIN') {
            const user = await User.findByPk(req.session.user.id);
            res.render('admin/index', { username: user.username });
        }
        else {
            res.redirect('/');
        }
    }
}

module.exports = new adminController();