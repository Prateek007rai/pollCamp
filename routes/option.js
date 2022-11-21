const express = require('express');
const router = express.Router();
const optionController = require('../controllers/option_controller');


router.post('/create' , optionController.create);
router.get('/destroy/:id' , optionController.destroy);
router.get('/vote/:id' , optionController.vote);


module.exports = router;