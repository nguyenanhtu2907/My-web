const bcrypt = require('bcryptjs');
const User = require('../models/User')
const Post = require('../models/Post');
// const { delete } = require('../routes/account');
class PostController {
    // register(req, res, next) {
    //     res.render('register', {
    //         layout: false,
    //     });

    // }
    // registerServer(req, res, next) {
    //     const password_hash = bcrypt.hashSync(req.body.password, 8);
    //     const entity = {
    //         username: req.body.username,
    //         fullname: req.body.fullname,
    //         gender: req.body.gender,
    //         email: req.body.email,
    //         password_hash,
    //     }
    //     User.findOne({ username: entity.username }, function (err, user) {
    //         if (user) {
    //             return res.render('register', {
    //                 layout: false,
    //                 message: 'Tên đăng nhập đã tồn tại!!!',
    //             })

    //         } else {
    //             const user = new User(entity);
    //             user.save()
    //                 .then(() => res.redirect('/'))
    //                 .catch(error => { })
    //         }
    //     })


    // }
    // login(req, res, next) {
    //     res.render('login', {
    //         layout: false,
    //     });
    // }
    // loginServer(req, res, next) {
    //     User.findOne({ username: req.body.username }, function (err, user) {
    //         if (user) {
    //             const rs = bcrypt.compareSync(req.body.password, user.password_hash);
    //             if (!rs) {
    //                 return res.render('login', {
    //                     layout: false,
    //                     message: 'Tên đăng nhập hoặc mật khẩu không đúng!',
    //                 })
    //             } 
    //         } else {
    //             return res.render('login', {
    //                 layout: false,
    //                 message: 'Tên đăng nhập hoặc mật khẩu không đúng!',
    //             })
    //         }

    //         delete user.password_hash;
    //         req.session.isAuthenticated = true;
    //         req.session.authUser = user;

    //         res.redirect('/account/profile')
    //     })
    // }

    // retrict(req, res, next) {
    //     if(!req.session.isAuthenticated){
    //         return res.redirect('/account/login')
    //     }
    //     next()
    // }

    // profile(req, res, next){
    //     res.json(req.session.authUser)
    // }


}
module.exports = new PostController;