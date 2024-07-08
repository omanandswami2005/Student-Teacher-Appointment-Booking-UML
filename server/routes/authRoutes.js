/**
 * Auth routes module.
 * @module routes/authRoutes
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const { forgotPassword } = require('../controllers/forgotPassword');
const { resetPassword } = require('../controllers/resetPassword');

/**
 * Checks if user is authenticated.
 * @name GET /check-auth
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.get('/check-auth', authMiddleware, authController.checkAuth);

/**
 * Registers a new user.
 * @name POST /register
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.post('/register', authController.register);

/**
 * Logs in a user.
 * @name POST /login
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.post('/login', authController.login);

/**
 * Logs out a user.
 * @name POST /logout
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.post('/logout', authController.logout);

/**
 * Verifies a user's email.
 * @name GET /verify-email
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.get('/verify-email', authController.verifyEmail);

/**
 * Sends a password reset email.
 * @name POST /forgot-password
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.post('/forgot-password', forgotPassword);

/**
 * Resets a user's password.
 * @name POST /reset-password
 * @function
 * @memberof module:routes/authRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.post('/reset-password', resetPassword);

module.exports = router;

