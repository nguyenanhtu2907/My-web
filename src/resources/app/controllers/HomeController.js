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
        Post.find({}).limit(20).skip(req.params.index * 20).sort({ 'createdAt': -1 })
        .then(posts => multipleMongooseToObj(posts))
        .then(posts => getPostsInfo(posts))
        .then(posts => res.json(posts))
        .catch(() => {})
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

module.exports = new HomeController;