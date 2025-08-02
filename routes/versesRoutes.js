const express = require('express');
const router = express.Router();
const VersesController = require('../controllers/VersesController');

router.get('/', VersesController.showVerses);
router.get('/dashboard', VersesController.showDashboard);

module.exports = router;