const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question_controller')


router.post('/create', questionController.create );
router.get('/destroy/:id', questionController.destroy );

module.exports = router;