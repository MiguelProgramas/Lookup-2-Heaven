const express = require('express');
const router = express.Router();
const VersesController = require('../controllers/VersesController');
const checkAuth = require('../helpers/auth').checkAuth;
const feedFixedVerses = require('../helpers/fixedVerseFeeder').feedFixedVerses;

router.get('/', VersesController.showVerses);
router.get('/dashboard', checkAuth, VersesController.showDashboard);
router.get('/add', checkAuth, feedFixedVerses, VersesController.createVerse);
router.get('/edit/:id', checkAuth, VersesController.updateVerse);
router.post('/add', checkAuth, VersesController.createVerseSave);
router.post('/remove', checkAuth, VersesController.removeVerse);
router.post('/edit', checkAuth, VersesController.updateVersePost)

module.exports = router;