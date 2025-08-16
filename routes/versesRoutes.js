const express = require('express');
const router = express.Router();
const VersesController = require('../controllers/VersesController');
const checkAuth = require('../helpers/auth').checkAuth;

router.get('/', VersesController.showVerses);
router.get('/dashboard', checkAuth, VersesController.showDashboard);
router.get('/add', checkAuth, VersesController.createVerse);

module.exports = router;