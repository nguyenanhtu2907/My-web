const express = require('express');
const router = express.Router();

const accountController = require('../controllers/AccountController');

router.get('/register', accountController.register);

router.post('/register', accountController.registerServer)

router.get('/login', accountController.login);

router.post('/login', accountController.loginServer);

module.exports = router;