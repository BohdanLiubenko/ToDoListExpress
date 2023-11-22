var express = require('express');
var router = express.Router();
const todocontroller = require('../controllers/toDoListController');

/* GET home page. */
router.get('/', todocontroller.renderIndex);

module.exports = router;
