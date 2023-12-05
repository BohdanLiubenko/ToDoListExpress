const express = require('express')
const router = express.Router()
const controller = require('../controllers/toDoListController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', authMiddleware, controller.create)
router.put('/:id', authMiddleware, controller.update)
router.delete('/:id', authMiddleware, controller.delete)

module.exports = router
