const Verse = require('../models/Verse');
const User = require('../models/User');

module.exports = class VersesController {
    static showVerses(req, res) {

        if (req.query.loggedOff) {

            const loggedOff = true;

            res.render('verses/home', { loggedOff });

        }

        else {

        res.render('verses/home');

        }
    }

    static showDashboard(req, res) {
        res.render('verses/dashboard');
    }
}