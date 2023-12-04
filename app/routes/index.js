var express = require('express');
var router = express.Router();
const todocontroller = require('../controllers/toDoListController');
const authMiddleware = require('../controllers/middleware/authMiddleware');

/* GET home page. */
router.get('/', authMiddleware, todocontroller.renderIndex);

module.exports = router;
