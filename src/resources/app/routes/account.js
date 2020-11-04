const express = require('express');
const router = express.Router();

const accountController = require('../controllers/AccountController');

router.get('/register', accountController.restrictRegister, accountController.register);

router.post('/register', accountController.registerPost)

router.get('/login', accountController.restrictRegister, accountController.login);

router.post('/login', accountController.loginPost);




// router.put('/change-password/:id', accountController.changePasswordServer);

// router.get('/change-password', accountController.restrictLogin, accountController.changePassword);

router.put('/:id/edit-password', accountController.editPasswordPut);

router.put('/:id/edit-information', accountController.editInformationPut);

// router.get('/create', accountController.create)

// router.post('/create', accountController.createServer)

// router.get('/create', accountController.create)

router.get('/logout', accountController.restrictLogin, accountController.logout);

router.get('/:id', accountController.profile);

router.get('/:id/nav', accountController.profileNav);

router.get('/:id/edit', accountController.restrictLogin, accountController.editProfile);



module.exports = router;