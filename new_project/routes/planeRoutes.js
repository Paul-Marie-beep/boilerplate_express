const express = require('express');

const userController = require('../controllers/userController');

// Par convention, on appelle le routeur router
const router = express.Router();

router.route('/').get(userController.getAllUsers);

module.exports = router;
