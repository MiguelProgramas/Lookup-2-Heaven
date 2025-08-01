const User = require("../models/User");
const bcrypt = require('bcryptjs')

module.exports = class AuthController {

    static login(req, res) {

        res.render('auth/login');

    }

    static async loginPost(req, res) {

        const { email, password } = req.body;

        const user = await User.findOne({where: {email: email}})

        if (!user) {

            const invalidUser = true;

            res.render('auth/login', { invalidUser });

            return

        }

        const passwordsMatch = bcrypt.compareSync(password, user.password);

        if (!passwordsMatch) {

            req.flash('message', "Right e-mail, wrong password, friend!");
            res.render('auth/login');

            return

        }

            req.session.userid = user.id;

            req.flash('message', 'You are logged in! Great to have you!');

            req.session.save(() => {

                res.redirect('/');

            })


    }

    static register(req, res) {
        res.render('auth/register');
    }

    static async registerPost(req, res) {

        const { name, email, password, passwordconfirmation } = req.body;

        if (password !== passwordconfirmation) {

            req.flash('message', 'These passwords do not match, friend. Please, try again!');
            res.render('auth/register');

            return

        }

        const userAlreadyExists = await User.findOne({where: {email: email}})

        if (userAlreadyExists) {

            res.render('auth/register', { userAlreadyExists });

            return

        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const user = {

            name,
            email,
            password: hashedPassword

        }

        try {

            const createdUser = await User.create(user);

            req.session.userid = createdUser.id;

            req.flash('message', 'You have succesfully registered an account! Hooray!');

            req.session.save(() => {

                res.render('verses/home');

            })

        }

        catch (err) {

            req.flash('message', `Oh no! An error occurred: ${err}`);

            res.render('verses/home');

        }

    }

    static logout(req, res) {
        req.session.destroy();
        res.redirect('/');
    }

}