const bcrypt = require('bcryptjs');
const User = require('../models/User')
const Post = require('../models/Post')
class AccountController {
    register(req, res, next) {
        res.render('register', {
            layout: false,
        });
    }
    registerDB(req, res, next) {
        const password_hash = bcrypt.hashSync(req.body.password, 8);
        const entity = {
            username: req.body.username,
            fullname: req.body.fullname,
            gender: req.body.gender,
            email: req.body.email,
            password_hash,
        }
        res.json(req.body)
            // res.render('register', {
            //     layout: false,
            // });
    }
    login(req, res, next) {
        res.render('login', {
            layout: false,
        });
    }
}
module.exports = new AccountController;