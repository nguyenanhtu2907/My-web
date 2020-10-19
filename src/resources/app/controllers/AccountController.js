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
        // var postsByUsername = Post.find({author: req.session.authUser.username})
        // .then(
        //     posts =>  multipleMongooseToObj(posts)
        // )
        
        // res.json(postsByUsername);




        // User.findOne( {_id: req.params.id}, function (err, user){
        // })
        

        res.send('Day la trang profile user')
        
    }

    editProfile(req, res, next) {
        //neu req.params.id === req.session.authUser thi vao trang edit
        // neu khong thi tra ve trang bao loi "Trang ban tim kiem hien khong co, hay quay lai"

        // User.findOne( {_id: req.params.id}, function (err, user){
        // })

        res.send('Day la trang edit profile user')
        
    }





    
    changePassword(req, res, next) {
        User.findById(req.session.authUser)
        .then(user => res.render('changePassword',{
            user: mongooseToObj(user),
        }))
        
    }

    changePasswordPut(req, res, next) {
        // User.updateOne({_id: req.params.id})
        User.findOne({ _id: req.params.id }, function (err, user) {
                const rs = bcrypt.compareSync(req.body.opassword, user.password_hash);
                if (!rs) {
                    return res.render('changePassword', {
                        message: 'Mật khẩu cũ không đúng!!!',
                        
                    })
                }
                const password_hash = bcrypt.hashSync(req.body.password, 8);
                user.password_hash=password_hash;

                user.save()
                .then(()=> res.redirect('/'))
                .catch(error => {})
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
module.exports = new AccountController;