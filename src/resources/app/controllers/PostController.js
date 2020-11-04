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
            timecook: req.body.timecook,
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
                    .then(posts => res.render('postDetail',{
                        post,
                        comments: post.comments,
                        posts,
                        user: req.session.authUser,
                        layout:false,
                    }))
                    .catch(() => {}) 
            })
            .catch(() => res.render('error404',{
                layout:false
            }))

    }
    
    addComment(req, res, next){
        var comment = {
            authorName: req.session.authUser.fullname,
            authorId: req.session.authUser._id,
            authorAvatar: req.session.authUser.avatar,
            content: req.body.content,
        }
        Post.findOne({slug: req.params.slug})
            .then(post=> {
                post.comments.push(comment);
                post.save()
                .then(()=>res.json(post.comments))
                .catch(()=>{})
            })
    }
    deleteComment(req, res, next){
        Post.findOne({slug: req.params.slug})
            .then(post=> {
                post.comments.pop();
                post.save()
                .then(()=>res.json(post.comments))
                .catch(()=>{})
            })
    }


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