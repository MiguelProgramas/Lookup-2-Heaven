const Verse = require('../models/Verse');
const User = require('../models/User');

module.exports = class VersesController {
    static showVerses(req, res) {

        if (req.query.loggedOff) {

            req.flash('message', 'You have logged off! See you soon!');

        }

        res.render('verses/home');

    
    }

    static showDashboard(req, res) {
        res.render('verses/dashboard');
    }

    static createVerse(req, res) {
        res.render('verses/add');
    }
}