module.exports = class AuthController {

    static login(req, res) {
        res.render('auth/login');
    }

    static register(req, res) {
        res.render('auth/register');
    }

    static registerPost(req, res) {

        const { name, email, password, passwordconfirmation } = req.body;

        if (password !== passwordconfirmation) {

            req.flash('message', 'These passwords do not match, friend. Please, try again!');
            res.render('auth/register');

            return

        }

    }

}