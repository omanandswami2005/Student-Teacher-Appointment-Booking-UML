/**
 * Routes for teacher functionalities.
 * @module routes/teacherRoutes
 * @requires express
 * @requires teacherController
 * @requires authMiddleware
 */

const express = require('express');
const router = express.Router();
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middlewares/authMiddleware');

/**
 * Schedule a new appointment for a teacher.
 *
 * @name POST /appointments
 * @function
 * @memberof module:routes/teacherRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.post(
  '/appointments',
  authMiddleware,
  teacherController.scheduleAppointment
);

/**
 * Update the status of an appointment.
 *
 * @name PUT /appointments/:id
 * @function
 * @memberof module:routes/teacherRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.put(
  '/appointments/:id',
  authMiddleware,
  teacherController.updateAppointmentStatus
);

/**
 * Cancel an appointment.
 *
 * @name POST /appointments/:id/cancel
 * @function
 * @memberof module:routes/teacherRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.post(
  '/appointments/:id/cancel',
  authMiddleware,
  teacherController.updateAppointmentStatus
);

/**
 * View all appointments of a teacher.
 *
 * @name GET /appointments
 * @function
 * @memberof module:routes/teacherRoutes
 * @inner
 * @param {express.Request} req - Express request object.
 * @param {express.Response} res - Express response object.
 * @param {express.NextFunction} next - Express next function.
 * @returns {Promise<void>}
 */
router.get('/appointments', teacherController.viewAllAppointments);

module.exports = router;
