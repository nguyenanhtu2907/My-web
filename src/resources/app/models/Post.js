const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Post = new Schema({
    title: { type: String, required: true },
    author: { type: String, default: '' },
    ingredients: { type: String, default: '' },
    post_description: { type: String, default: '' },
    detail: { type: String, default: '', required: true },
    like: { type: Number, default: 0 },
    comments: { type: Array, default: [] },
})
module.exports = mongoose.model('Post', Post);