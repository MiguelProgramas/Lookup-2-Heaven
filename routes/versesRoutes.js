const express = require('express');
const router = express.Router();
const VersesController = require('../controllers/VersesController');

router.get('/', VersesController.showVerses);

module.exports = router;