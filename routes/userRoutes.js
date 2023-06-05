const express = require('express');
const userController = require('../controllers/userController');
const viewController = require('../controllers/viewController');
const postController = require('../controllers/postController');

const router = express.Router();

router.get('/signup', userController.isLoggedIn, viewController.getSignupPage);

router.get('/login', userController.isLoggedIn, viewController.getLoginPage);

router.get('/logout', userController.logout);

router
  .route('/:username')
  .get(userController.isLoggedIn, viewController.getAccountPage)
  .delete(userController.isLoggedIn, postController.deletePost);

router.post('/signup', userController.signup);

router.post('/login', userController.login);

module.exports = router;
