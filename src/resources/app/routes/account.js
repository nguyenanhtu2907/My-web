const express = require('express');
const router = express.Router();

const accountController = require('../controllers/AccountController');

router.get('/register', accountController.register);

router.post('/register', accountController.registerDB)

router.get('/login', accountController.login);

module.exports = router;