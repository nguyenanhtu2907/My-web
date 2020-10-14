const express = require('express');
const router = express.Router();

const accountController = require('../controllers/AccountController');

router.get('/register', accountController.restrictRegister, accountController.register);

router.post('/register', accountController.registerServer)

router.get('/login', accountController.restrictRegister, accountController.login);

router.post('/login', accountController.loginServer);




router.get('/change-password', accountController.restrictLogin, accountController.changePassword);

router.put('/change-password/:id', accountController.changePasswordServer);




// router.get('/create', accountController.create)

// router.post('/create', accountController.createServer)

// router.get('/create', accountController.create)

router.get('/logout', accountController.restrictLogin, accountController.logout);


module.exports = router;