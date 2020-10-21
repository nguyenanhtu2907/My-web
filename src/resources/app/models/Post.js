const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');

mongoose.plugin(slug);

const Post = new Schema({
    title: { type: String, required: true },
    author: { type: String, default: '' },
    thumbnail: { type: String, default: '' },
    ration: { type: String, default: '' },
    // timecook: { type: String, default: '' },
    post_description: { type: String, default: '' },
    ingredients: { type: Array, default: [] },
    steps: { type: String, default: '', required: true },
    like: { type: Number, default: 0 },
    comments: { type: Array, default: [] },
    slug: {type: String, slug: 'title', unique: true},
}, {
    timestamps: true,
})
module.exports = mongoose.model('Post', Post);