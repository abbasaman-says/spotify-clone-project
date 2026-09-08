const express = require('express');
const authController = require('../Controllers/auth.controller');
const { authUser } = require("../Middlewares/auth.middleware");

const router = express.Router();

router.post('/register', authController.registerUser)

router.post('/login', authController.LoginUser)

router.post('/logout', authController.logoutUser)

router.get('/me', authUser, authController.getCurrentUser);




module.exports = router;