const Verse = require('../models/Verse');
const User = require('../models/User');
const Fixed = require('../models/Fixed');

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

    static async createVerse(req, res) {

        const verseId = Math.floor(Math.random() * 5) + 1;

        const verse = await Fixed.findOne({where: {id: verseId}})

        const refinedVerse = verse.get({ plain: true });

        const line = refinedVerse.title;

        const width = refinedVerse.width;

        res.render('verses/add', { line, width });
    }
}