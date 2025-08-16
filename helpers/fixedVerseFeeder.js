module.exports.feedFixedVerses = async function(req, res, next ){

    const Fixed = require('../models/Fixed');


    const psalm = {

        title: "For he will deliver you from the snare of the fowler and from the deadly pestilence.' (Psalms 90:3)",

    }

    const genesis = {

        title: "And God said, “Let there be light,” and there was light.' (Genesis 1:3)",

    }

    const matthew = {

        title: "[...] Our Father which art in heaven, Hallowed be thy name.' (Matthew 6:9)",

    }

    const john = {

        title: "After this, Jesus, knowing that everything was now accomplished, that the Scripture might be fulfilled, said, 'I thirst.' (John 19:28)",

    }

    const john2 = {

        title: "Jesus answered, “I am the way and the truth and the life. No one comes to the Father except through me.“' (John 14:6)",

    }

    const verses = [psalm, genesis, matthew, john, john2];

    const verification = await Fixed.findOne({where: {id: 1}});

    if (!verification) {

        try {

            for (let i = 0; i < verses.length; i++) {
                await Fixed.create(verses[i]);
            }
        }
        catch(error) {
            console.log(`Something went wrong with feeding the database the fixed verses: ${error}`)
        }

    }

    next();

}
