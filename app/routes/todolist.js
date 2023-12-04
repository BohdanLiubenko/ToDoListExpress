var express = require('express');
var router = express.Router();
const controller = require('../controllers/toDoListController');
const authMiddleware = require('../controllers/middleware/authMiddleware');

router.post('/create', authMiddleware, controller.create);
router.put('/update/:id', authMiddleware, controller.update);
router.delete('/delete/:id', authMiddleware, controller.delete);

module.exports = router;