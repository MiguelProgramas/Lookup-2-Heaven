const Verse = require('../models/Verse');
const User = require('../models/User');
const Fixed = require('../models/Fixed');

module.exports = class VersesController {
    static async showVerses(req, res) {

        if (req.query.loggedOff) {

            req.flash('message', 'You have logged off! See you soon!');

        }

        const verses = await Verse.findAll({

            include: User

        });

        const readableVerses = verses.map((verse) => verse.get({ plain: true}));

        res.render('verses/home', { readableVerses });

    
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

    let noVerses = false;

    if (verses.length === 0) {

         noVerses = true;

    }

    const verseId = req.query.id;

    let deletedVerse = false;

    if (req.query.title) {

         deletedVerse = {

            id: req.query.verseId,
            UserId: req.query.UserId,
            title: req.query.title

        }

    }

    let revived = false;

    if (req.query.undone) {

        revived = true;

    }

        res.render('verses/dashboard', { verses, noVerses, verseId, deletedVerse, revived });
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

            const latestVerse = await Verse.findOne({order: [['createdAt', 'DESC']], raw:true});

            req.session.save(() => {

                res.redirect(`/verses/dashboard?id=${latestVerse.id}`);

            })


        }
        catch(err) {

            console.log(`There was an error when attempting to share a verse: ${err}`)

        }

    }

    static async removeVerse(req, res) {

        const verse = req.body.id;
        const UserId = req.session.userid;
        const text = await Verse.findOne({where: {id: verse, UserId: UserId}, raw:true});
        console.log(text.title)

        try {

            await Verse.destroy({where: {id: verse, UserId: UserId}})

            req.session.save(() => {

                res.redirect(`/verses/dashboard?verseId=${verse}&UserId=${UserId}&title=${text.title}`)

            })

        }
        catch(err) {

            console.log(`There was a problem with deleting the verse: ${err}`);

        }

    }

    static async updateVerse(req, res) {

        const id = req.params.id;

        const verse = await Verse.findOne({where: {id: id}, raw: true });

        res.render('verses/edit', { verse });

    }

    static async updateVersePost(req, res) {

        const verseId = req.body.id;

        const newVerse = {

            title: req.body.title,

        }

        try {

        await Verse.update(newVerse, {where: {id: verseId}});

        req.flash('message', 'Verse updated succesfully!');

        req.session.save(() => {

            res.redirect('/verses/dashboard');

        })

        }

        catch(err) {

            console.log(`We weren't able to update the verse: ${err}`)

        }

    }

    static async undoVerseRemoval(req, res) {

        const versePhoenix = {

            id: req.query.verseId,
            title: req.query.title,
            UserId: req.query.UserId

        }

        await Verse.create(versePhoenix);

        res.redirect('/verses/dashboard?undone=yep')

    }

}