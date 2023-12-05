const express = require('express')
const router = express.Router()
const todocontroller = require('../controllers/toDoListController')
const authMiddleware = require('../middleware/authMiddleware')

router.get('/', authMiddleware, todocontroller.renderIndex)

module.exports = router
