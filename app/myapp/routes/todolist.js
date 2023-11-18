var express = require('express');
var router = express.Router();
const controller = require('../controllers/toDoListController');

router.post('/create', controller.create);

module.exports = router;