const express = require('express')
const router = express.Router()
const controller = require('../controllers/adminController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, controller.renderIndex)

module.exports = router
