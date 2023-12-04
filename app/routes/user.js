var express = require('express');
var router = express.Router();
const controller = require('../controllers/userController');

router.get('/', controller.rendeRegister);
router.get('/login', controller.rendeLogin);
router.get('/logout', controller.logout);
router.post('/', controller.register);
router.post('/login', controller.login);

module.exports = router;
