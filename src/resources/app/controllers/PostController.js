const bcrypt = require('bcryptjs');
const User = require('../models/User')
const Post = require('../models/Post');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj');
const { post } = require('../routes/post');

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
        post.save()
            .then(() => res.redirect(`/account/${req.session.authUser._id}`))
            .catch(error => { })
    }

    detail(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then(post => mongooseToObj(post))
            .then(post => getPostInfo(post))
            .then(function (post) {
                Post.find({ author: post.author }).limit(3).sort({ 'createdAt': -1 })
                    .then(posts => multipleMongooseToObj(posts))
                    .then(posts => res.json({post, posts}))
                    .catch(() => {}) 
            })
            .catch(() => res.render('error404',{
                layout:false
            }))

    }
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

async function getPostInfo(post) {
    var user = await User.findOne({ _id: post.author });
    post.authorName = user.fullname;
    post.authorAvatar = user.avatar;
    return post
}
async function getPostsInfo(posts) {
    for (var post of posts) {
        var user = await User.findOne({ _id: post.author });
        post.authorName = user.fullname;
        post.authorAvatar = user.avatar;
    }
    return posts
}

module.exports = new PostController;