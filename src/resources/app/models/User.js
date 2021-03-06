const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
    fullname: { type: String, default: '' },
    gender: { type: String, default: '' },
    email: { type: String, default: '' },
    password_hash: { type: String, default: '' },
    user_description: { type: String, default: '' },
    avatar: { type: String, default: 'https://scontent.fhan4-1.fna.fbcdn.net/v/t1.15752-9/52911767_415619089012411_4488307855874588672_n.png?_nc_cat=108&ccb=2&_nc_sid=ae9488&_nc_ohc=ZMIxVCZW87sAX9-cskz&_nc_ht=scontent.fhan4-1.fna&oh=dbb64f20bb30b2d2df283e87f11b949b&oe=5FB8FE52' },
    post: { type: Array, default: [] },
    liked_post: { type: Array, default: [] },
    following: { type: Array, default: [] },
    followed: { type: Array, default: [], }
})
module.exports = mongoose.model('User', User);