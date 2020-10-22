const bcrypt = require('bcryptjs');
const User = require('../models/User')
const Post = require('../models/Post');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj');

class PostController {
    create(req, res, next) {
        res.render('createPost', {
            layout: false,
        })
    }
    createPost(req, res, next) {
        req.body.author = req.session.authUser._id;
        var steps = [];
        for (var i = 0; i < req.body.steps.length / 2; i++) {
            var step = {
                text: req.body.steps[2 * i],
                img: req.body.steps[2 * i + 1],
            }
            steps.push(step);
        }
        // res.json(req.body)
        // setTimeout(function(){
        const entity = {
            title: req.body.title,
            author: req.body.author,
            thumbnail: req.body.thumbnail,
            ration: req.body.ration,
            postdescription: req.body.postdescription,
            ingredients: req.body.ingredients,
            steps: steps,
        }
        // res.json(entity);
        // },0)
        const post = new Post(entity);
        // console.log(post);
        post.save()
            .then(() => res.redirect(`/account/${req.session.authUser._id}`))
            .catch(error => { })

    }




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