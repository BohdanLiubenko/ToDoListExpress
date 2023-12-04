var express = require('express');
var router = express.Router();
const controller = require('../controllers/adminController');
const authMiddleware = require('../controllers/middleware/authMiddleware');

router.get('/', authMiddleware, controller.renderIndex);

module.exports = router;