var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController');

router.get('/', (req, res, next) => {
  res.redirect('user/register');
})
router.get('/register', (req, res, next) => {
  res.render('user/register', { errors: {} });
})
router.get('/login', (req, res, next) => {
  res.render('user/login', { error: '' });
})
router.get('/logout', controller.logout);
router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;
