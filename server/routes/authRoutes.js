const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const {forgotPassword} = require('../controllers/forgotPassword');
const {resetPassword} = require('../controllers/resetPassword');

router.get('/check-auth',authMiddleware, authController.checkAuth);

router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/logout', authController.logout);

router.get('/verify-email', authController.verifyEmail);

router.post('/forgot-password',  forgotPassword);
router.post('/reset-password',  resetPassword);

module.exports = router;
