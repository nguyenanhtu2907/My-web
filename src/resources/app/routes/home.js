const express = require('express');
const router = express.Router();

const homeController = require('../controllers/HomeController')

router.get('/suggested-feed/:index', homeController.moreSuggestedFeed);

router.get('/followed-feed/:index', homeController.moreFollowedFeed);

// router.get('/followed_feed', homeController.index);

// router.get('/suggested_feed', homeController.index);

router.get('/', homeController.index);

module.exports = router;