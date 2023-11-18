var express = require('express');
var router = express.Router();
const { User } = require('../models/user');
const jwtProvider = require('jsonwebtoken');
const jwtUtil = require('../util/jwtUtil');

/* GET home page. */
router.get('/', async (req, res, next) => {
  if (req.session.token) {
    var decodeToken = null
    try {
      decodeToken = jwtProvider.verify(req.session.token, jwtUtil.jwtSecret);
    }
    catch (err) {
      console.error(`catch token err: ${err} for ${req.session.token}`);
      res.redirect('/user');
      return;
    }
    const user = await User.findByPk(decodeToken.userId);
    res.render('index', { title: `Welcome back ${user.username}` });
  } else {
    res.redirect('/user')
  }
});

module.exports = router;
