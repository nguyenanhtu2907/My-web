const express = require('express');
const router = express.Router();

const postController = require('../controllers/PostController');
const accountController = require('../controllers/AccountController');

router.get('/create', 
// accountController.restrictLogin,
 postController.create);

router.post('/create', postController.createPost);

// router.get('/login', postController.login);

// router.post('/login', postController.loginServer);

// router.get('/profile', postController.retrict, postController.profile);

// router.get('/create', postController.create)

// router.post('/create', postController.createServer)

// router.get('/create', postController.create)

module.exports = router;