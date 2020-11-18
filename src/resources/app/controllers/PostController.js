const bcrypt = require('bcryptjs');
const User = require('../models/User')
const Post = require('../models/Post');
const { mongooseToObj, multipleMongooseToObj } = require('../util/mongooseToObj');
const { post } = require('../routes/post');
const e = require('express');

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
                let num = Post.count({ author: post.author }, function (err, num) {
                    if (num) {
                        return num;
                    }
                    return err;
                })
                Post.find({ author: post.author }).limit(3).skip(Math.random(num - 2)).sort({ 'createdAt': -1 })
                    .then(morePosts => multipleMongooseToObj(morePosts))
                    .then(morePosts => getPostsInfo(morePosts))
                    .then(morePosts => res.render('postDetail', {
                        post,
                        comments: post.comments,
                        morePosts,
                        user: req.session.authUser,
                        layout: false,
                    }))
                    .catch(() => { })
            })
            .catch(() => res.render('error404', {
                layout: false
            }))
    }

    addComment(req, res, next) {
        if(req.body.content.trim){
            var comment = {
                authorName: req.session.authUser.fullname,
                authorId: req.session.authUser._id,
                authorAvatar: req.session.authUser.avatar,
                content: req.body.content,
            }
            Post.findOne({ slug: req.params.slug })
                .then(post => {
                    post.comments.push(comment);
                    post.save()
                        .then(() => res.json(post.comments))
                        .catch(() => { })
                })
        }
    }
    deleteComment(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then(post => {
                post.comments.pop();
                post.save()
                    .then(() => res.json(post.comments))
                    .catch(() => { })
            })
    }
    search(req,res,next){
        if(req.query.q){
            let queryStr = removeVietnameseTones(req.query.q);
            let queryArr = queryStr.split(" ");
            let result =  queryArr.join('.*');
            // console.log('.*'+result+'.*');
            Post.find({slug: {$regex: '.*'+result+'.*'}})
            .then(posts => multipleMongooseToObj(posts))
                    .then(posts => getPostsInfo(posts))
                    .then(posts=>res.render('search',{
                        layout: false,
                        posts,
                        count: posts.length,
                        query: req.query.q,
                    }))
            .catch(()=>{})
        }
    }
}
function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
async function getPostInfo(post) {
    var user = await User.findOne({ _id: post.author });
    post.authorName = user.fullname;
    post.authorAvatar = user.avatar;
    let date_ob = post.updatedAt;
    let date = ("0" + date_ob.getDate()).slice(-2);
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
    let year = date_ob.getFullYear();
    post.date = date + '/' + month + '/' + year;
    return post
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

module.exports = new PostController;