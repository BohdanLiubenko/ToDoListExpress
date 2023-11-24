var express = require('express');
var router = express.Router();
const controller = require('../controllers/adminController');

router.get('/', controller.renderIndex);

module.exports = router;