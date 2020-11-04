const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Post = require('../models/Post');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj')


// const { delete } = require('../routes/account');
class AccountController {
    register(req, res, next) {
        res.render('register', {
            layout: false,
        });

    }
    registerPost(req, res, next) {
        const password_hash = bcrypt.hashSync(req.body.password, 8);
        const entity = {
            username: req.body.username,
            fullname: req.body.fullname,
            gender: req.body.gender,
            email: req.body.email,
            password_hash,
        }
        User.findOne({ username: entity.username }, function (err, user) {
            if (user) {
                return res.render('register', {
                    layout: false,
                    message: 'Tên đăng nhập đã tồn tại!!!',
                    values: req.body,
                })

            } else {
                const user = new User(entity);
                user.save()
                    .then(() => res.redirect('/'))
                    .catch(error => { })
            }
        })
    }
    login(req, res, next) {
        res.render('login', {
            layout: false,
        });
    }
    loginPost(req, res, next) {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (user) {

                const rs = bcrypt.compareSync(req.body.password, user.password_hash);
                if (!rs) {
                    return res.render('login', {
                        layout: false,
                        message: 'Tên đăng nhập hoặc mật khẩu không đúng!',
                        values: req.body,
                    })
                }
            } else {
                return res.render('login', {
                    layout: false,
                    message: 'Tên đăng nhập hoặc mật khẩu không đúng!',
                    values: req.body,
                })
            }

            delete user.password_hash;
            req.session.isAuthenticated = true;
            req.session.authUser = user;

            //url lay duoc tu restrict
            const url = req.query.retUrl || '/';

            res.redirect(url)
        })
    }
    profile(req, res, next) {
        var error = '';
        var userTarget;
        User.findOne({ _id: req.params.id }, function (err, user) {
            if (!user) {
                error = "Nguoi dung khong ton tai";
            } else {
                userTarget = user;
                Post.find({ author: req.params.id }).limit(10).skip(req.query.page * 10 || 0).sort({ 'createdAt': -1 })
                    .then(posts => multipleMongooseToObj(posts))
                    .then(posts => getPostsInfo(posts))
                    .then(posts => {
                        if (userTarget) {
                            res.json({ userTarget, posts, countPost: posts.length })
                        } else {
                            return res.render('error404', {
                                layout: false
                            })
                        }
                    }) //render profile page
                    .catch(() => { res.send(error) }) //reder error
            }
            //    return res.render('profile',{
            //        user: mongooseToObj(user),
            //        postsByUsername,
            //    })

            // res.json({ user, postsByUsername, error });
        })

    }
    //link: /post/:id/nav?page=... fetch data 
    profileNav(req, res, next) {
        Post.find({ author: req.params.id }).limit(10).skip(req.query.page * 10 || 0).sort({ 'createdAt': -1 })
            .then(posts => multipleMongooseToObj(posts))
            .then(posts => getPostsInfo(posts))
            .then(posts => res.json(posts))
            .catch(() => { })
    }

    editProfile(req, res, next) {
        //neu req.params.id === req.session.authUser thi vao trang edit
        // neu khong thi tra ve trang bao loi "Trang ban tim kiem hien khong co, hay quay lai"
        // console.log(req.session.authUser._id)
        if (req.params.id === req.session.authUser._id && (req.query.type === 'information' || req.query.type === 'password')) {
            User.findOne({ _id: req.params.id }, function (err, user) {
                if (!user) {
                    return res.render('error404', {
                        layout: false,
                    })
                } else {
                    return res.render('editProfile', {
                        layout: false,
                        user: mongooseToObj(user),
                        type: req.query.type,
                    })
                }
            })
        } else {
            return res.render('error404', {
                layout: false,
            })
        }

        // res.send('Day la trang edit profile user')
    }
    //cap nhat thong tin ca nhan 
    editInformationPut(req, res, next) {
        User.findOne({ _id: req.params.id }, function (err, user) {
            user.fullname = req.body.fullname;
            user.email = req.body.email;
            user.gender = req.body.gender;
            user.user_description = req.body.user_description;
            user.save()
                .then(() => res.json({
                    message: '*Đổi mật khẩu thành công!!!',
                    user: user,
                }))
                .catch(error => { })
        })
    }

    // changePassword(req, res, next) {
    //     User.findById(req.session.authUser)
    //         .then(user => res.render('changePassword', {
    //             user: mongooseToObj(user),
    //         }))
    // }
    //cap nhat mat khau
    editPasswordPut(req, res, next) {
        // User.updateOne({_id: req.params.id})
        User.findOne({ _id: req.params.id }, function (err, user) {
            const rs = bcrypt.compareSync(req.body.opassword, user.password_hash);
            if (!rs) {
                // return 
                // res.render('editProfile', 
                res.json({
                    message: '*Mật khẩu cũ không đúng!!!',
                    res: 0,
                    // layout:false,
                    // user: mongooseToObj(user),
                    // type: 'password',
                })
                // )
            }
            const password_hash = bcrypt.hashSync(req.body.password, 8);
            user.password_hash = password_hash;

            user.save()
                .then(() => res.json({
                    message: '*Đổi mật khẩu thành công!!!',
                    res: 1,
                }))
                .catch(error => { })
            // delete user.password_hash;
            // req.session.authUser = user;
        })
    }

    logout(req, res, next) {
        req.session.isAuthenticated = false;
        req.session.authUser = null;
        //tra ve trang truoc do
        // console.log(req.headers.referer)
        res.redirect(req.headers.referer || '/');
    }

    //lay url chen request khi truy cap ma chua dang nhap
    restrictLogin(req, res, next) {
        if (!req.session.isAuthenticated) {
            return res.redirect(`/account/login?retUrl=${req.originalUrl}`)
        }
        next()
    }
    restrictRegister(req, res, next) {
        if (req.session.isAuthenticated) {
            return res.redirect(`/`)
        }
        next()
    }
}

async function getPostsInfo(posts) {
    for (var post of posts) {
        var user = await User.findOne({ _id: post.author });
        post.authorName = user.fullname;
        post.authorAvatar = user.avatar;
    }
    return posts
}

module.exports = new AccountController;