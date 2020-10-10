const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    username: { type: String, required: true },
    fullname: { type: String, default: '' },
    gender: { type: String, default: '' },
    email: { type: String, default: '' },
    password_hash: { type: String, default: '' },
    user_description: { type: String, default: '' },
    avatar: { type: String, default: '/img/default-profile.jpg' },
    post: { type: Array, default: [] },
    liked_post: { type: Array, default: [] },
    following: { type: Array, default: [] },
    followed: { type: Array, default: [], }
})
module.exports = mongoose.model('User', User);