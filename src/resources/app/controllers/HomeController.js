const User = require('../models/User');
const Post = require('../models/Post');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj')

class HomeController {
    //[GET] /
    index(req, res, next) {
        Post.find({}).limit(20).sort({ 'createdAt': -1 })
            .then(posts => res.render('home'))
        // .then(posts => multipleMongooseToObj(posts))
        // .then(posts => getPostsInfo(posts))
        // .then(posts => res.json(posts))
    }

    moreSuggestedFeed(req, res, next) {
        Post.find({}).limit(20).skip(req.params.index * 20).sort({ 'createdAt': -1 })
            .then(posts => multipleMongooseToObj(posts))
            .then(posts => getPostsInfo(posts))
            .then(posts => res.json(posts))
            .catch(() => { })
    }

    moreFollowedFeed(req, res, next) {
        console.log(req.session.authUser.following[0])
        Post.find({ author: req.session.authUser.following[0] }).limit(20).skip(req.params.index * 20).sort({ 'createdAt': -1 })
            .then(posts => multipleMongooseToObj(posts))
            .then(posts => getPostsInfo(posts))
            .then(posts => res.json(posts))
            .catch(() => { })
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
    return posts
}

module.exports = new HomeController;