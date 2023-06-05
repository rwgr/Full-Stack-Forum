const express = require('express');
const postController = require('../controllers/postController');
const userController = require('../controllers/userController');
const viewController = require('../controllers/viewController');
const commentController = require('../controllers/commentController');

const router = express.Router();

router
  .route('/create-post')
  .get(userController.isLoggedIn, viewController.getNewPost);

router
  .route('/create-post')
  .post(userController.protect, postController.createNewPost);

// Can add isLoggedIn here instead of adding to both .get and .post below

router
  .route('/:postSlug')
  .get(userController.isLoggedIn, viewController.getPost)
  .post(userController.isLoggedIn, commentController.createComment)
  .delete(userController.protect, commentController.deleteComment);

router
  .route('/:postSlug/editPost')
  .get(userController.protect, viewController.getEditPost)
  .patch(userController.protect, postController.editPost);

module.exports = router;
