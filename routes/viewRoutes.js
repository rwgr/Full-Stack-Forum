const express = require('express');
const viewController = require('../controllers/viewController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.isLoggedIn, viewController.getDefaultView);

router
  .route('/update-password')
  .get(userController.protect, viewController.getUpdatePassword)
  .patch(userController.protect, userController.updatePassword);

module.exports = router;
