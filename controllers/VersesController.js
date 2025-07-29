const Verse = require('../models/Verse');
const User = require('../models/User');

module.exports = class VersesController {
    static async showVerses(req, res) {
        res.render('verses/home');
    }
}