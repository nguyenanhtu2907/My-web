const express = require('express');
const router = express.Router();

const postController = require('../controllers/PostController');
const accountController = require('../controllers/AccountController');

router.get('/create', accountController.restrictLogin, postController.create);

router.post('/create', postController.createPost);

router.get('/search', postController.search)

router.post('/:slug/add-comment', accountController.restrictLogin, postController.addComment)

router.put('/:slug/delete-comment', accountController.restrictLogin, postController.deleteComment)

router.get('/:slug', postController.detail)

module.exports = router;