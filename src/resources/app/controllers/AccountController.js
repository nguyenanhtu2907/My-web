const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Post = require('../models/Post');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj')
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
                    .then(() => res.redirect('/account/login'))
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
                return res.render('error404', {
                    layout: false
                })
            } else {
                userTarget = user;
                let number = 0;
                Post.count({ author: userTarget._id }, function (err, num) {
                    if (num) {
                        number = num
                    }
                })
                Post.find({ author: req.params.id }).limit(10).skip(req.query.page * 10 || 0).sort({ 'createdAt': -1 })
                    .then(posts => multipleMongooseToObj(posts))
                    .then(posts => getPostsInfo(posts))
                    .then(posts => {
                        if (userTarget) {
                            return res.render('profile', {
                                layout: false,
                                userTarget: mongooseToObj(userTarget),
                                posts,
                                countPost: number,
                                page: (number > 10 ? Math.ceil(number / 10) : 1),
                                showPage: number > 10 ? 1 : 0,
                                query: (req.query.tab === 'saved' ? 1 : 0)
                            })
                        } else {
                            return res.render('error404', {
                                layout: false
                            })
                        }
                    }) //render profile page
                    .catch(() => { res.send(error) }) //reder error
            }
        })
    }



    //link: /account/:id/nav?page=... fetch data 
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
            if(req.body.avatar){
                user.avatar=req.body.avatar;
            }
            user.email = req.body.email;
            user.gender = req.body.gender;
            if(req.body.user_description){
                user.user_description = req.body.user_description;
            }
            req.session.authUser=user;
            user.save()
                .then(() => res.json({
                    message: '*Thay đổi thành công!!!',
                    user: user,
                    res: 1,
                }))
                .catch(error => res.render('error404', {
                    layout: false,
                }))
        })
    }

    //cap nhat mat khau
    editPasswordPut(req, res, next) {
        // User.updateOne({_id: req.params.id})
        console.log(req.params.id)
        User.findOne({ _id: req.params.id }, function (err, user) {
            const rs = bcrypt.compareSync(req.body.password, user.password_hash);
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
            const password_hash = bcrypt.hashSync(req.body.new_password, 8);
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
        let date_ob = post.updatedAt;
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        post.date = date + '/' + month + '/' + year;
    }
    return posts;
}

module.exports = new AccountController;