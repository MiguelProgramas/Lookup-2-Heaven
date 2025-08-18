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

    static async showDashboard(req, res) {

        const userid = req.session.userid;

        const user = await User.findOne({ where: {

            id: userid

        },

        include: Verse,
        plain: true
    
    })

    const verses = user.Verses.map((verse) => verse.dataValues);

        res.render('verses/dashboard', { verses });
    }

    static async createVerse(req, res) {

        const verseId = Math.floor(Math.random() * 5) + 1;

        const verse = await Fixed.findOne({where: {id: verseId}})

        const refinedVerse = verse.get({ plain: true });

        const line = refinedVerse.title;

        const width = refinedVerse.width;

        res.render('verses/add', { line, width });
    }

    static async createVerseSave(req, res) {

        const verse = {

            title: req.body.title,
            UserId: req.session.userid

        }

        try {

            await Verse.create(verse);

            req.flash('message', 'Verse added to the community tab succesfully! Thanks for your contribution!');

            req.session.save(() => {

                res.redirect('/verses/dashboard')

            })


        }
        catch(err) {

            console.log(`There was an error when attempting to share a verse: ${err}`)

        }

    }

}