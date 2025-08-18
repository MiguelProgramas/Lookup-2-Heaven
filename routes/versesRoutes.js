const express = require('express');
const router = express.Router();
const VersesController = require('../controllers/VersesController');
const checkAuth = require('../helpers/auth').checkAuth;
const feedFixedVerses = require('../helpers/fixedVerseFeeder').feedFixedVerses;

router.get('/', VersesController.showVerses);
router.get('/dashboard', checkAuth, VersesController.showDashboard);
router.get('/add', checkAuth, feedFixedVerses, VersesController.createVerse);
router.post('/add', checkAuth, VersesController.createVerseSave);

module.exports = router;