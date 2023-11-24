var express = require('express');
var router = express.Router();
const jwtProvider = require('jsonwebtoken');
const jwtUtil = require('../util/jwtUtil');
const {User} = require('../models/user');
const controller = require('../controllers/adminController');

router.get('/', controller.renderIndex);

module.exports = router;